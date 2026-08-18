import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument {
  type: string;
  fileId: mongoose.Types.ObjectId;
  fileName: string;
}

export interface IApplication extends Document {
  name: string;
  phone: string;
  email: string;
  city: string;
  dob: string;
  gender: string;
  board: string;
  passYear: string;
  pcb: string;
  neetStatus: string;
  neetScore: string;
  neetYear: string;
  countries: string[];
  budget: string;
  notes: string;
  documents: IDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>({
  type: { type: String, required: true },
  fileId: { type: Schema.Types.ObjectId, required: true },
  fileName: { type: String, required: true }
});

const ApplicationSchema = new Schema<IApplication>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String },
    dob: { type: String },
    gender: { type: String },
    board: { type: String },
    passYear: { type: String },
    pcb: { type: String },
    neetStatus: { type: String },
    neetScore: { type: String },
    neetYear: { type: String },
    countries: { type: [String], default: [] },
    budget: { type: String },
    notes: { type: String },
    documents: { type: [DocumentSchema], default: [] },
  },
  { timestamps: true }
);

const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
