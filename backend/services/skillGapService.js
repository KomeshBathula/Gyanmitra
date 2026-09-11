import { db } from '../data/db.js';
import { calculateSkillGaps } from '../utils/skillGapCalculator.js';

export const skillGapService = {
  getUserSkillGaps: async (userId) => {
    const user = db.users.find(u => u._id === userId) || db.users[0];
    const userCompetencies = user.competencies || db.competenciesList;
    return calculateSkillGaps(userCompetencies, db.coursesCatalog);
  },

  getGapDetailById: async (userId, gapId) => {
    const user = db.users.find(u => u._id === userId) || db.users[0];
    const userCompetencies = user.competencies || db.competenciesList;
    const gaps = calculateSkillGaps(userCompetencies, db.coursesCatalog);

    const cleanGapId = String(gapId).toLowerCase().replace('gap-', '');
    const foundGap = gaps.find(g => 
      g.id === gapId || 
      g.id === `gap-${gapId}` || 
      String(g.competencyId) === cleanGapId ||
      g.competency?.toLowerCase().includes(cleanGapId)
    ) || gaps[0];

    const syllabusModules = [
      {
        module: 1,
        title: `Foundations & Official Framework for ${foundGap.competency}`,
        duration: "4 Hours",
        status: "Mandatory",
        description: "Official MoSPI statistical framework guidelines and baseline principles."
      },
      {
        module: 2,
        title: `Practical Implementation & National Data Pipeline`,
        duration: "6 Hours",
        status: "Core",
        description: "Hands-on exercises with survey microdata validation, imputation and quality audits."
      },
      {
        module: 3,
        title: `Advanced Governance & APAR Calibration Assessment`,
        duration: "3 Hours",
        status: "Certification",
        description: "Final proctored diagnostic assessment to certify level upgrade."
      }
    ];

    const matchedCourses = db.coursesCatalog.filter(c => 
      c.competency?.toLowerCase().includes(foundGap.competency?.toLowerCase()) ||
      foundGap.competency?.toLowerCase().includes(c.competency?.toLowerCase())
    );

    return {
      gap: foundGap,
      syllabusModules,
      recommendedCourses: matchedCourses.length > 0 ? matchedCourses : [db.coursesCatalog[0]],
      cadrePolicy: {
        mandate: "MoSPI National Training Policy & FRAC 2026",
        resolutionDays: foundGap.priority === 'High' ? 45 : 90,
        aparWeightage: "15% of annual competency rating",
        authority: "Capacity Building Commission (CBC) & NSSTA"
      },
      auditTrail: {
        lastAssessment: "Induction Baseline Diagnostic",
        status: foundGap.gap > 0 ? "Under Review / Deficit Flagged" : "Benchmark Satisfied",
        verifiedBy: "GyanMitra Rule Engine & NSSTA Faculty"
      }
    };
  }
};

