import mongoose from 'mongoose';

const ContactDetailSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Please provide a key (e.g. phone, email, address)'],
    unique: true,
  },
  value: {
    type: String,
    required: [true, 'Please provide a value'],
  },
}, { timestamps: true });

export default mongoose.models.ContactDetail || mongoose.model('ContactDetail', ContactDetailSchema);
