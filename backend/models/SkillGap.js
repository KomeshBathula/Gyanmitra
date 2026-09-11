import mongoose from 'mongoose';

const skillGapSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  userId: { type: String, default: 'usr_001' },
  competencyId: { type: String },
  competency: { type: String, required: true },
  category: { type: String, default: 'Technical' },
  domain: { type: String, default: 'Statistical' },
  currentLevel: { type: Number, required: true },
  targetLevel: { type: Number, required: true },
  requiredLevel: { type: Number, required: true },
  gap: { type: Number, required: true },
  priority: { type: String, default: 'Medium' },
  severity: { type: String, default: 'Medium' },
  evidence: { type: String },
  why: { type: String },
  recommendedCourse: { type: String },
  provider: { type: String, default: 'iGOT Karmayogi / NSSTA' },
  status: { type: String, default: 'Identified' }
}, {
  timestamps: true,
  _id: false
});

export const SkillGap = mongoose.models.SkillGap || mongoose.model('SkillGap', skillGapSchema);
