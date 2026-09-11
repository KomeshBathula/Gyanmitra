import { db } from '../data/db.js';
import { skillGapService } from './skillGapService.js';
import { generateRecommendations } from '../utils/recommendationEngine.js';

export const recommendationService = {
  getPersonalizedRecommendations: async (userId) => {
    const user = db.users.find(u => u._id === userId) || db.users[0];
    const skillGaps = await skillGapService.getUserSkillGaps(userId);
    return generateRecommendations(user, skillGaps, db.coursesCatalog, db.trainingPrograms);
  }
};
