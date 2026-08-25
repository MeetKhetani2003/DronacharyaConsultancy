'use server';

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Media from '@/models/Media';
import Testimonial from '@/models/Testimonial';

import Faq from '@/models/Faq';
import Event from '@/models/Event';
import ContactDetail from '@/models/ContactDetail';

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

// FAQS
export async function createFaq(formData: FormData) {
  try {
    await connectToDatabase();
    const q = formData.get('q') as string;
    const a = formData.get('a') as string;
    if (!q || !a) return { error: 'Missing fields' };
    await new Faq({ q, a }).save();
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create faq' };
  }
}
export async function getFaqs() {
  try {
    await connectToDatabase();
    const data = await Faq.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    return { error: 'Failed to fetch faqs' };
  }
}
export async function deleteFaq(id: string) {
  try {
    await connectToDatabase();
    await Faq.findByIdAndDelete(id);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete faq' };
  }
}

// EVENTS
export async function createEvent(formData: FormData) {
  try {
    await connectToDatabase();
    const title = formData.get('title') as string;
    const place = formData.get('place') as string;
    const image = formData.get('image') as string;
    if (!title || !place || !image) return { error: 'Missing fields' };
    await new Event({ title, place, image }).save();
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create event' };
  }
}
export async function getEvents() {
  try {
    await connectToDatabase();
    const data = await Event.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    return { error: 'Failed to fetch events' };
  }
}
export async function deleteEvent(id: string) {
  try {
    await connectToDatabase();
    await Event.findByIdAndDelete(id);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete event' };
  }
}

// PAGECONTENT
// CONTACT DETAILS
export async function createContactDetail(formData: FormData) {
  try {
    await connectToDatabase();
    const key = formData.get('key') as string;
    const value = formData.get('value') as string;
    if (!key || !value) return { error: 'Missing fields' };
    await ContactDetail.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true });
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update contact detail' };
  }
}
export async function getContactDetails() {
  try {
    await connectToDatabase();
    const data = await ContactDetail.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    return { error: 'Failed to fetch contact details' };
  }
}
export async function deleteContactDetail(id: string) {
  try {
    await connectToDatabase();
    await ContactDetail.findByIdAndDelete(id);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete contact detail' };
  }
}
import University from '@/models/University';

// UNIVERSITIES
export async function createUniversity(formData: FormData) {
  try {
    await connectToDatabase();
    const name = formData.get('name') as string;
    const country = formData.get('country') as string;
    const flag = formData.get('flag') as string;
    const rank = formData.get('rank') as string;
    const recognition = formData.get('recognition') as string;
    const fees = formData.get('fees') as string;
    const image = formData.get('image') as string;

    if (!name || !country || !image) return { error: 'Missing fields' };
    await new University({ name, country, flag, rank, recognition, fees, image }).save();
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create university' };
  }
}

export async function getUniversities() {
  try {
    await connectToDatabase();
    const data = await University.find().lean();
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    return { error: 'Failed to fetch universities' };
  }
}

export async function deleteUniversity(id: string) {
  try {
    await connectToDatabase();
    await University.findByIdAndDelete(id);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete university' };
  }
}
// UPDATE ACTIONS
export async function updateTestimonial(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    const data = Object.fromEntries(formData);
    await Testimonial.findByIdAndUpdate(id, data);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) { return { error: 'Failed to update testimonial' }; }
}
export async function updateUniversity(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    const data = Object.fromEntries(formData);
    await University.findByIdAndUpdate(id, data);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) { return { error: 'Failed to update university' }; }
}
export async function updateFaq(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    const data = Object.fromEntries(formData);
    await Faq.findByIdAndUpdate(id, data);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) { return { error: 'Failed to update faq' }; }
}
export async function updateEvent(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    const data = Object.fromEntries(formData);
    await Event.findByIdAndUpdate(id, data);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) { return { error: 'Failed to update event' }; }
}

export async function updateContactDetail(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    const data = Object.fromEntries(formData);
    await ContactDetail.findByIdAndUpdate(id, data);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) { return { error: 'Failed to update contact detail' }; }
}
