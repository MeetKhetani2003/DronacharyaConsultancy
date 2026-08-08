'use server';

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Media from '@/models/Media';
import Testimonial from '@/models/Testimonial';

// TESTIMONIALS
export async function createTestimonial(formData: FormData) {
  try {
    await connectToDatabase();
    
    const name = formData.get('name') as string;
    const university = formData.get('university') as string;
    const quote = formData.get('quote') as string;

    if (!name || !university || !quote) {
      return { error: 'Missing required fields' };
    }

    const newTestimonial = new Testimonial({ name, university, quote });
    await newTestimonial.save();
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create testimonial' };
  }
}

export async function getTestimonials() {
  try {
    await connectToDatabase();
    const data = await Testimonial.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    return { error: 'Failed to fetch testimonials' };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await connectToDatabase();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete testimonial' };
  }
}

// MEDIA
export async function getMedia() {
  try {
    await connectToDatabase();
    const data = await Media.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    return { error: 'Failed to fetch media' };
  }
}

export async function deleteMedia(id: string) {
  try {
    await connectToDatabase();
    // We ideally should also delete the file from the filesystem here, but we'll keep it simple for now and just remove the DB record.
    await Media.findByIdAndDelete(id);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete media' };
  }
}
