import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  category: { type: String },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
  sourceCitation: { type: String }
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  cadre: { type: String, default: 'ISS / SSS / Official Statistics' },
  duration: { type: Number, default: 900 }, // in seconds (15 min)
  durationMinutes: { type: Number, default: 15 },
  passingScore: { type: Number, default: 70 },
  competencyDomain: { type: String, default: 'Python for Data Analysis & Official Sampling' },
  totalQuestions: { type: Number, default: 5 },
  questions: [questionSchema]
}, {
  timestamps: true,
  _id: false
});

export const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);
