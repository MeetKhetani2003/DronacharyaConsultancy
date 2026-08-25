import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  place: {
    type: String,
    required: [true, 'Please provide a place'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  span: {
    type: String,
    default: 'normal',
    enum: ['normal', 'tall', 'wide'],
  },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
