import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import connectToDatabase from '@/lib/mongodb';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const bucket = new GridFSBucket(db, { bucketName: 'images' });

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (e) {
      return new NextResponse('Invalid image ID', { status: 400 });
    }

    const files = await bucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return new NextResponse('Image not found', { status: 404 });
    }
    const fileInfo = files[0];

    const stream = bucket.openDownloadStream(objectId);

    // Convert Node.js readable stream to Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk)));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new NextResponse(webStream, {
      headers: {
        'Content-Type': fileInfo.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error: any) {
    console.error('Image fetch error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
