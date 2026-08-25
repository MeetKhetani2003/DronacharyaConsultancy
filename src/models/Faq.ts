import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  q: {
    type: String,
    required: [true, 'Please provide a question'],
  },
  a: {
    type: String,
    required: [true, 'Please provide an answer'],
  },
}, { timestamps: true });

export default mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
