import { db } from '../data/db.js';
import { Competency } from '../models/Competency.js';
import { User } from '../models/User.js';
import mongoose from 'mongoose';

export const competencyService = {
  getOverview: async (userId) => {
    return db.competencies;
  },

  getCompetenciesList: async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const comps = await Competency.find().lean();
        if (comps && comps.length > 0) return comps;
      } catch (err) {}
    }
    return db.competenciesList;
  },

  updateFromAssessmentResult: async (userId, { scorePercentage, competencyImpacted, assessmentDomain }) => {
    // 1. Calculate Score Delta
    const scoreDelta = scorePercentage >= 70 ? 4 : 1;
    db.competencies.overallScore = Math.min(100, db.competencies.overallScore + scoreDelta);
    db.competencies.monthlyDelta = "+12%";

    // 2. Update category domain score in radar
    const domainCat = db.competencies.categories.find(
      c => c.name.toLowerCase().includes((assessmentDomain || "statistical").toLowerCase()) ||
           c.id === (assessmentDomain || "stat")
    );
    if (domainCat) {
      domainCat.score = Math.min(100, domainCat.score + (scorePercentage >= 70 ? 5 : 2));
    }

    // 3. Update demonstrated competency level in user profile
    const user = db.users.find(u => u._id === userId) || db.users[0];
    if (user && user.competencies) {
      const comp = user.competencies.find(c => c.name.toLowerCase() === (competencyImpacted || "").toLowerCase());
      if (comp) {
        comp.currentLevel = Math.min(comp.targetLevel, comp.currentLevel + (scorePercentage >= 70 ? 1 : 0));
      }
    }

    // 4. Update Karma points
    if (user) {
      user.karmayogiCredits = (user.karmayogiCredits || 799) + (scorePercentage >= 70 ? 100 : 25);
    }

    // Persist to MongoDB if connected
    if (mongoose.connection.readyState === 1 && user) {
      try {
        await User.findByIdAndUpdate(user._id, {
          $set: {
            competencies: user.competencies,
            karmayogiCredits: user.karmayogiCredits
          }
        });
      } catch (err) {
        console.warn("[CompetencyService] Could not persist to MongoDB:", err.message);
      }
    }

    return {
      updatedOverview: db.competencies,
      updatedUserCredits: user?.karmayogiCredits
    };
  }
};

