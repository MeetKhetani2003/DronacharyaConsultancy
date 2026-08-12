import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import connectToDatabase from '@/lib/mongodb';
import Media from '@/models/Media';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('file') as File | null;
    const link = formData.get('link') as string | null;
    const title = formData.get('title') as string | null;
    const category = formData.get('category') as string | null;

    if (!title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!file && !link) {
      return NextResponse.json({ error: 'Provide either a file or a link' }, { status: 400 });
    }

    if (category !== 'Photos' && category !== 'Videos') {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    let fileUrl = '';

    if (link) {
      fileUrl = link;
    } else if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.' + file.name.split('.').pop();
      
      // Ensure uploads directory exists
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory might already exist
      }

      const path = join(uploadDir, filename);
      await writeFile(path, buffer);

      fileUrl = `/uploads/${filename}`;
    }

    // Save to database
    await connectToDatabase();
    
    const media = new Media({
      title,
      category,
      src: fileUrl,
    });
    
    await media.save();

    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
