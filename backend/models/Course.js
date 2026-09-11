import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  courseId: { type: String },
  title: { type: String, required: true },
  code: { type: String },
  type: { type: String, default: 'Course' },
  level: { type: String, default: 'Intermediate' },
  difficulty: { type: String, default: 'Intermediate' },
  domain: { type: String, default: 'Statistical' },
  competency: { type: String },
  sector: { type: String },
  subSector: { type: String },
  duration: { type: String, default: '1h 0m' },
  language: { type: String, default: 'English' },
  provider: { type: String, default: 'iGOT Karmayogi Bharat' },
  providerType: { type: String, default: 'iGOT' },
  category: { type: String, default: 'Course' },
  isNew: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  enrollmentCount: { type: Number, default: 1000 },
  completionCount: { type: Number, default: 800 },
  certificateAvailable: { type: Boolean, default: true },
  karmaPoints: { type: Number, default: 100 },
  bannerBg: { type: String },
  bannerBadge: { type: String },
  description: { type: String },
  skills: [{ type: String }],
  syllabus: [{ type: String }]
}, {
  timestamps: true,
  _id: false,
  suppressReservedKeysWarning: true
});

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
