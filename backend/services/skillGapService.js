import { db } from '../data/db.js';
import { calculateSkillGaps } from '../utils/skillGapCalculator.js';

export const skillGapService = {
  getUserSkillGaps: async (userId) => {
    const user = db.users.find(u => u._id === userId) || db.users[0];
    const userCompetencies = user.competencies || db.competenciesList;
    return calculateSkillGaps(userCompetencies, db.coursesCatalog);
  }
};
