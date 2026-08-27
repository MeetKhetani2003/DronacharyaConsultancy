import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    flag: { type: String, required: true },
    image: { type: String, required: true },
    fees: { type: String, required: true },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true },
    recognition: { type: String, required: true },
    medium: { type: String, required: true },
    highlight: { type: String, required: true },
    intake: { type: String, required: true },
  },
  { timestamps: true }
);

export const Country = mongoose.models.Country || mongoose.model('Country', countrySchema);
