/**
 * NSSTA (National Statistical Systems Training Academy) Integration Adapter Interface
 *
 * Abstract base adapter defining integration contracts with NSSTA official portal
 * and training nomination gateway.
 */

export class NsstaAdapter {
  async getTrainingPrograms(filter = {}) {
    throw new Error("getTrainingPrograms() must be implemented by adapter subclass.");
  }

  async getTrainingProgram(programId) {
    throw new Error("getTrainingProgram() must be implemented by adapter subclass.");
  }

  async registerTraining(userId, programId, nominationData = {}) {
    throw new Error("registerTraining() must be implemented by adapter subclass.");
  }

  async getTrainingStatus(userId, programId) {
    throw new Error("getTrainingStatus() must be implemented by adapter subclass.");
  }
}
