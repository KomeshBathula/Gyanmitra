import { NsstaAdapter } from './nsstaAdapter.js';
import { db } from '../../data/db.js';

/**
 * MockNsstaAdapter
 *
 * Prototype mock integration simulating official NSSTA academy training programmes,
 * cadre nominations, and residential workshop rosters.
 */
export class MockNsstaAdapter extends NsstaAdapter {
  constructor() {
    super();
    this.name = "Mock NSSTA Academy Adapter";
    this.academyLocation = "Greater Noida, Uttar Pradesh";
  }

  async getTrainingPrograms({ domain, targetCadre, status } = {}) {
    let list = [...db.trainingPrograms];

    if (domain) {
      list = list.filter(p => p.domain?.toLowerCase() === domain.toLowerCase());
    }

    if (targetCadre) {
      list = list.filter(p => p.targetCadre?.toLowerCase().includes(targetCadre.toLowerCase()));
    }

    if (status) {
      list = list.filter(p => p.status?.toLowerCase() === status.toLowerCase());
    }

    return {
      total: list.length,
      programs: list
    };
  }

  async getTrainingProgram(programId) {
    if (!programId) return null;
    const cleanId = String(programId).toLowerCase().replace(/[-_]/g, '');
    const prog = db.trainingPrograms.find(p => {
      const match1 = p.programId && String(p.programId).toLowerCase().replace(/[-_]/g, '') === cleanId;
      const match2 = p.id && String(p.id).toLowerCase().replace(/[-_]/g, '') === cleanId;
      return match1 || match2;
    });
    if (prog) return prog;

    const numMatch = String(programId).match(/\d+/);
    if (numMatch) {
      const idx = parseInt(numMatch[0], 10) - 1;
      if (idx >= 0 && idx < db.trainingPrograms.length) {
        return db.trainingPrograms[idx];
      }
    }
    return db.trainingPrograms[0] || null;
  }

  async registerTraining(userId, programId, nominationData = {}) {
    const program = await this.getTrainingProgram(programId);
    if (!program) {
      return { success: false, message: "NSSTA Program not found." };
    }

    if (program.seatsAvailable <= 0) {
      return { success: false, message: "Nominations for this batch are currently full." };
    }

    program.seatsAvailable -= 1;

    return {
      success: true,
      message: `Nomination forward to Head of Cadre / NSSTA Course Director for ${program.title}`,
      nominationId: `NOM-${Date.now()}`,
      programTitle: program.title,
      startDate: program.startDate,
      venue: program.venue,
      status: "Nomination Forwarded"
    };
  }

  async getTrainingStatus(userId, programId) {
    return {
      userId,
      programId,
      status: "Approved",
      verifiedBy: "Dr. Meenakshi Sundaram, NSSTA Course Director"
    };
  }
}

export const mockNsstaAdapter = new MockNsstaAdapter();
