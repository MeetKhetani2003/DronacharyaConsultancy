import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import connectToDatabase from '@/lib/mongodb';



export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const bucket = new GridFSBucket(db, { bucketName: 'images' });

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    return new Promise<NextResponse>((resolve) => {
      const uploadStream = bucket.openUploadStream(filename, {
        contentType: file.type || 'image/jpeg',
      });

      uploadStream.end(buffer);

      uploadStream.on('finish', () => {
        resolve(NextResponse.json({ success: true, id: uploadStream.id.toString(), url: `/api/images/${uploadStream.id}` }));
      });

      uploadStream.on('error', (err) => {
        resolve(NextResponse.json({ error: 'Upload failed', details: err.message }, { status: 500 }));
      });
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
