import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
  sourceCitation: { type: String },
  relatedModule: { type: String },
  moduleId: { type: Number }
}, { _id: false });

const generatedQuizSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  documentName: { type: String, required: true },
  topic: { type: String, default: 'Official Capacity Building' },
  difficulty: { type: String, default: 'Medium' },
  questionCount: { type: Number, default: 3 },
  createdAt: { type: String, default: 'Today' },
  createdBy: { type: String, default: 'Ministry Administrator' },
  departmentId: { type: String, default: 'statistical' },
  targetDepartment: { type: String, default: 'Survey Design and Research Division (SDRD)' },
  targetUserId: { type: String, default: 'usr_001' },
  targetUserName: { type: String, default: 'Rajesh Kumar' },
  courseId: { type: String, default: 'cnt-1' },
  courseTitle: { type: String, default: 'Understanding Corporate Insolvency Resolution Process' },
  passingScorePercentage: { type: Number, default: 70 },
  isLive: { type: Boolean, default: true },
  questions: [quizQuestionSchema]
}, {
  timestamps: true,
  _id: false
});

export const GeneratedQuiz = mongoose.models.GeneratedQuiz || mongoose.model('GeneratedQuiz', generatedQuizSchema);
