import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  country: {
    type: String,
    required: [true, 'Please provide a country'],
  },
  flag: {
    type: String,
    required: [true, 'Please provide a flag emoji'],
  },
  rank: {
    type: String,
    required: [true, 'Please provide a rank'],
  },
  recognition: {
    type: String,
    required: [true, 'Please provide recognition details'],
  },
  fees: {
    type: String,
    required: [true, 'Please provide fees'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
}, { timestamps: true });

export default mongoose.models.University || mongoose.model('University', UniversitySchema);
