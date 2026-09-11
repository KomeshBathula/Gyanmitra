import mongoose from 'mongoose';
import { config } from '../config/config.js';
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';
import { Competency } from '../models/Competency.js';
import { SkillGap } from '../models/SkillGap.js';
import { Assessment } from '../models/Assessment.js';
import { LearningPathway } from '../models/LearningPathway.js';
import { GeneratedQuiz } from '../models/GeneratedQuiz.js';
import { Notification } from '../models/Notification.js';

import { mockCourses } from '../data/mockCourses.js';
import { mockCompetencies } from '../data/mockCompetencies.js';
import { mockAssessments } from '../data/mockAssessments.js';
import { mockNotifications } from '../data/mockNotifications.js';
import { seedUsers, seedSkillGaps, seedLearningPathways, seedGeneratedQuizzes } from './seedData.js';
import { db } from '../data/db.js';

export const seedDatabase = async ({ checkEmptyOnly = false } = {}) => {
  const isDirectRun = !mongoose.connection.readyState;

  if (isDirectRun) {
    try {
      console.log(`[Database Seeder] Connecting to MongoDB: ${config.mongodbUri}...`);
      await mongoose.connect(config.mongodbUri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[Database Seeder] Connected successfully.`);
    } catch (err) {
      console.warn(`[Database Seeder] MongoDB not reachable (${err.message}). Populating local in-memory store.`);
      syncToMemory();
      return { success: false, inMemorySynced: true };
    }
  }

  try {
    const userCount = await User.countDocuments();
    if (checkEmptyOnly && userCount > 0) {
      console.log(`[Database Seeder] Database already contains ${userCount} users. Preserving existing records.`);
      syncToMemory();
      return { success: true, alreadySeeded: true };
    }

    console.log(`[Database Seeder] Seeding default MoSPI, NSSTA & iGOT collections...`);

    if (!checkEmptyOnly) {
      await User.deleteMany({});
      await Course.deleteMany({});
      await Competency.deleteMany({});
      await SkillGap.deleteMany({});
      await Assessment.deleteMany({});
      await LearningPathway.deleteMany({});
      await GeneratedQuiz.deleteMany({});
      await Notification.deleteMany({});
    }

    // 1. Seed Users (with upsert)
    for (const u of seedUsers) {
      await User.findByIdAndUpdate(u._id, u, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded ${seedUsers.length} Official Users & Cadre Administrators`);

    // 2. Seed Courses
    for (const c of mockCourses) {
      const courseDoc = { _id: c.id, ...c };
      await Course.findByIdAndUpdate(courseDoc._id, courseDoc, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded ${mockCourses.length} iGOT Karmayogi & NSSTA Courses`);

    // 3. Seed Competencies
    for (const comp of mockCompetencies) {
      const compDoc = { _id: comp.id, ...comp };
      await Competency.findByIdAndUpdate(compDoc._id, compDoc, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded ${mockCompetencies.length} MoSPI Competency Domains`);

    // 4. Seed Skill Gaps
    for (const gap of seedSkillGaps) {
      await SkillGap.findByIdAndUpdate(gap._id, gap, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded ${seedSkillGaps.length} Role Benchmark Skill Gaps`);

    // 5. Seed Assessments
    for (const asm of mockAssessments) {
      const asmDoc = { _id: asm.id, ...asm };
      await Assessment.findByIdAndUpdate(asmDoc._id, asmDoc, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded ${mockAssessments.length} Diagnostic Assessments`);

    // 6. Seed Learning Pathways
    for (const lp of seedLearningPathways) {
      await LearningPathway.findByIdAndUpdate(lp._id, lp, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded Learning Pathways`);

    // 7. Seed Generated Quizzes
    for (const gq of seedGeneratedQuizzes) {
      await GeneratedQuiz.findByIdAndUpdate(gq._id, gq, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded AI Material Generated Quizzes`);

    // 8. Seed Notifications
    for (const notif of mockNotifications) {
      const notifDoc = { _id: notif.id, ...notif };
      await Notification.findByIdAndUpdate(notifDoc._id, notifDoc, { upsert: true, returnDocument: 'after' });
    }
    console.log(`  ✓ Seeded Mandates & Alerts`);

    console.log(`[Database Seeder] All collections successfully populated with default inputs!`);
    syncToMemory();

    return { success: true };
  } catch (err) {
    console.error(`[Database Seeder] Seeding error:`, err.message);
    syncToMemory();
    return { success: false, error: err.message };
  } finally {
    if (isDirectRun && mongoose.connection.readyState) {
      await mongoose.disconnect();
      console.log(`[Database Seeder] Disconnected from MongoDB.`);
    }
  }
};

function syncToMemory() {
  db.users = [...seedUsers];
  db.courses = [...mockCourses];
  db.coursesCatalog = [...mockCourses];
  db.competenciesList = [...mockCompetencies];
  db.assessments = [...mockAssessments];
  db.notifications = [...mockNotifications];
  db.generatedQuizzes = [...seedGeneratedQuizzes];
}

// Execute directly if run as a script: node scripts/seed.js
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
