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
    const prog = db.trainingPrograms.find(p => p.programId === programId);
    return prog || null;
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
