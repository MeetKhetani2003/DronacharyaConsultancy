import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    await connectToDatabase();

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'documents',
    });

    const docTypes = ['Class 10 Marksheet', 'Class 12 Marksheet', 'NEET Scorecard', 'Passport / ID Proof', 'Passport Photo'];
    const documents = [];

    // Process files
    for (const docType of docTypes) {
      const file = formData.get(docType) as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to GridFS
        const uploadStream = bucket.openUploadStream(file.name, {
          metadata: { documentType: docType }
        });

        // We wrap the stream operations in a Promise to wait for it to finish
        const fileId = await new Promise<mongoose.Types.ObjectId>((resolve, reject) => {
          uploadStream.on('error', reject);
          uploadStream.on('finish', () => {
            // @ts-ignore - The types for GridFSBucketWriteStream might not accurately reflect that it has an id property of type ObjectId
            resolve(uploadStream.id);
          });
          uploadStream.end(buffer);
        });

        documents.push({
          type: docType,
          fileId: fileId,
          fileName: file.name
        });
      }
    }

    // Extract text fields
    const applicationData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      city: formData.get('city') as string,
      dob: formData.get('dob') as string,
      gender: formData.get('gender') as string,
      board: formData.get('board') as string,
      passYear: formData.get('passYear') as string,
      pcb: formData.get('pcb') as string,
      neetStatus: formData.get('neetStatus') as string,
      neetScore: formData.get('neetScore') as string,
      neetYear: formData.get('neetYear') as string,
      countries: JSON.parse((formData.get('countries') as string) || '[]'),
      budget: formData.get('budget') as string,
      notes: formData.get('notes') as string,
      documents: documents
    };

    const application = new Application(applicationData);
    await application.save();

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
