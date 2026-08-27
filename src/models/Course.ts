import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    href: { type: String, required: true },
    icon: { type: String, required: false },
    category: { type: String, required: true, default: 'General' },
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
