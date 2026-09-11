import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  employeeId: { type: String, required: true },
  designation: { type: String, required: true },
  group: { type: String },
  department: { type: String, required: true },
  departmentId: { type: String, default: 'general' },
  ministry: { type: String },
  division: { type: String },
  cadre: { type: String },
  location: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  reportingOfficer: { type: String },
  yearsOfExperience: { type: Number, default: 1 },
  education: { type: String },
  roleResponsibilities: [{ type: String }],
  previousTraining: [{ type: String }],
  karmayogiCredits: { type: Number, default: 0 },
  currentRank: { type: String, default: "Unranked" },
  learningHours: { type: String, default: "0h 0m" },
  badgesEarned: { type: Number, default: 0 },
  certificatesCount: { type: Number, default: 0 },
  postsCount: { type: Number, default: 0 },
  profileCompletion: { type: Number, default: 50 },
  role: { type: String, enum: ['EMPLOYEE', 'TRAINER', 'ADMIN', 'employee', 'trainer', 'admin'], default: 'EMPLOYEE' },
  avatar: { type: String },
  bio: { type: String },
  aparStatus: { type: String, default: 'Compliant' },
  activeCoursesCount: { type: Number, default: 0 },
  competencies: [{
    id: String,
    name: String,
    currentLevel: { type: Number, default: 1 },
    targetLevel: { type: Number, default: 3 },
    importance: { type: Number, default: 3 },
    roleRelevance: { type: Number, default: 0.8 }
  }],
  completedCourses: [{ type: String }],
  currentCourses: [{ type: String }]
}, {
  timestamps: true,
  _id: false
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
