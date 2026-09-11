/**
 * iGOT Karmayogi Bharat Integration Adapter Interface
 *
 * Abstract base adapter defining integration contracts with the official
 * iGOT Karmayogi Bharat API gateway (https://portal.igotkarmayogi.gov.in).
 *
 * In Phase 1: Handled by MockIgotAdapter.
 * In Phase 2/3: Replace with official OAuth2 mTLS iGOT API implementation.
 */

export class IgotAdapter {
  async searchCourses(params = {}) {
    throw new Error("searchCourses() must be implemented by adapter subclass.");
  }

  async getCourse(courseId) {
    throw new Error("getCourse() must be implemented by adapter subclass.");
  }

  async getCourseDetails(courseId) {
    throw new Error("getCourseDetails() must be implemented by adapter subclass.");
  }

  async enrollCourse(userId, courseId, metadata = {}) {
    throw new Error("enrollCourse() must be implemented by adapter subclass.");
  }

  async getEnrollmentStatus(userId, courseId) {
    throw new Error("getEnrollmentStatus() must be implemented by adapter subclass.");
  }

  async getLearningProgress(userId, courseId) {
    throw new Error("getLearningProgress() must be implemented by adapter subclass.");
  }

  async getCompletedCourses(userId) {
    throw new Error("getCompletedCourses() must be implemented by adapter subclass.");
  }
}
