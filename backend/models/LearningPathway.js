import mongoose from 'mongoose';

const milestoneStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true },
  provider: { type: String, default: 'iGOT Karmayogi / NSSTA' },
  duration: { type: String, default: '10 Hours' },
  credits: { type: Number, default: 20 },
  status: { type: String, enum: ['Completed', 'In Progress', 'Locked', 'Available'], default: 'Locked' },
  competencyGain: { type: String },
  targetLevel: { type: Number, default: 3 },
  description: { type: String }
}, { _id: false });

const learningPathwaySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  userId: { type: String, default: 'usr_001' },
  cadreRole: { type: String, default: 'ISS Deputy Director Mandate' },
  targetCompetency: { type: String, default: 'Python & Statistical Machine Learning' },
  totalSteps: { type: Number, default: 5 },
  completedSteps: { type: Number, default: 2 },
  estimatedTotalHours: { type: String, default: '48 Hours' },
  totalCredits: { type: Number, default: 120 },
  steps: [milestoneStepSchema]
}, {
  timestamps: true,
  _id: false
});

export const LearningPathway = mongoose.models.LearningPathway || mongoose.model('LearningPathway', learningPathwaySchema);
