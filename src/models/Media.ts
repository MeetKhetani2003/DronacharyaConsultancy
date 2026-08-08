import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMedia extends Document {
  title: string;
  category: 'Photos' | 'Videos';
  src: string;
  createdAt: Date;
}

const MediaSchema: Schema<IMedia> = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Photos', 'Videos'],
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);

export default Media;
