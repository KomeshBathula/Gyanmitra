import mongoose from 'mongoose';

const competencySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  domain: { type: String, required: true },
  description: { type: String },
  levels: {
    level1: { name: String, description: String },
    level2: { name: String, description: String },
    level3: { name: String, description: String },
    level4: { name: String, description: String },
    level5: { name: String, description: String }
  },
  currentLevel: { type: Number, default: 1 },
  targetLevel: { type: Number, default: 3 },
  proficiencyPercentage: { type: Number, default: 50 },
  verifiedAssessmentsCount: { type: Number, default: 1 },
  importance: { type: Number, default: 3 },
  roleRelevance: { type: Number, default: 0.8 }
}, {
  timestamps: true,
  _id: false
});

export const Competency = mongoose.models.Competency || mongoose.model('Competency', competencySchema);
