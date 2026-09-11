import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
  sourceCitation: { type: String }
}, { _id: false });

const generatedQuizSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  documentName: { type: String, required: true },
  topic: { type: String, default: 'Official Statistics' },
  difficulty: { type: String, default: 'Medium' },
  questionCount: { type: Number, default: 3 },
  createdAt: { type: String, default: 'Today' },
  createdBy: { type: String, default: 'Ministry Administrator' },
  departmentId: { type: String, default: 'civil' },
  isLive: { type: Boolean, default: true },
  questions: [quizQuestionSchema]
}, {
  timestamps: true,
  _id: false
});

export const GeneratedQuiz = mongoose.models.GeneratedQuiz || mongoose.model('GeneratedQuiz', generatedQuizSchema);
