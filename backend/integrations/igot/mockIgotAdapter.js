import { IgotAdapter } from './igotAdapter.js';
import { db } from '../../data/db.js';

/**
 * MockIgotAdapter
 *
 * Prototype mock integration. Replace with official iGOT API implementation
 * when authorized API credentials/interfaces are available.
 */
export class MockIgotAdapter extends IgotAdapter {
  constructor() {
    super();
    this.name = "Mock iGOT Karmayogi Bharat Adapter";
    this.apiVersion = "v1-mock";
  }

  async searchCourses({ category, sector, subSector, search, sortBy, difficulty, domain, limit = 20, page = 1 } = {}) {
    let items = [...db.coursesCatalog];

    if (category && category !== 'all') {
      items = items.filter(c => c.category?.toLowerCase() === category.toLowerCase());
    }

    if (sector && sector !== 'all') {
      items = items.filter(c => c.sector?.toLowerCase() === sector.toLowerCase());
    }

    if (subSector && subSector !== 'all') {
      items = items.filter(c => c.subSector?.toLowerCase() === subSector.toLowerCase());
    }

    if (difficulty && difficulty !== 'all') {
      items = items.filter(c => c.difficulty?.toLowerCase() === difficulty.toLowerCase());
    }

    if (domain && domain !== 'all') {
      items = items.filter(c => c.domain?.toLowerCase() === domain.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(c =>
        c.title?.toLowerCase().includes(q) ||
        c.provider?.toLowerCase().includes(q) ||
        c.code?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.competency?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'popular') {
      items.sort((a, b) => (b.karmaPoints || 0) - (a.karmaPoints || 0));
    } else if (sortBy === 'az') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return {
      total: items.length,
      page: Number(page),
      limit: Number(limit),
      courses: items
    };
  }

  async getCourse(courseId) {
    const course = db.coursesCatalog.find(c => c.id === courseId || c.courseId === courseId);
    return course || null;
  }

  async getCourseDetails(courseId) {
    const course = await this.getCourse(courseId);
    if (!course) return null;

    return {
      ...course,
      externalIgotUrl: `https://portal.igotkarmayogi.gov.in/app/toc/${course.courseId || course.id}/overview`,
      providerPartner: course.provider,
      curriculum: course.syllabus || []
    };
  }

  async enrollCourse(userId, courseId, metadata = {}) {
    const existing = db.myLearningCourses.find(c => c.courseId === courseId || c.id === courseId);
    if (existing) {
      return { success: true, message: "Already enrolled", enrollment: existing };
    }

    const courseTemplate = db.coursesCatalog.find(c => c.id === courseId || c.courseId === courseId);

    const newEnrollment = {
      id: `ml-${Date.now()}`,
      courseId: courseId,
      userId: userId || "usr_001",
      title: metadata.title || courseTemplate?.title || "Enrolled Course",
      provider: metadata.provider || courseTemplate?.provider || "iGOT Karmayogi",
      type: courseTemplate?.type || "Course",
      level: metadata.level || courseTemplate?.level || "Beginner",
      difficulty: courseTemplate?.difficulty || "Beginner",
      duration: metadata.duration || courseTemplate?.duration || "1h 00m",
      progress: 0,
      isRetired: false,
      status: "inprogress",
      enrolledAt: new Date().toISOString(),
      bgGradient: "from-blue-900 via-indigo-950 to-slate-900",
      thumbnailText: metadata.title || courseTemplate?.title || "New Course",
      thumbnailSub: metadata.provider || courseTemplate?.provider || "iGOT Karmayogi",
      syllabus: courseTemplate?.syllabus || [
        "Module 1: Orientation and Introduction",
        "Module 2: Core Practical Concepts",
        "Module 3: Case Studies & Government Applications",
        "Module 4: Final Certification Assessment"
      ]
    };

    db.myLearningCourses.push(newEnrollment);

    // Update user's currentCourses list
    const user = db.users.find(u => u._id === userId) || db.users[0];
    if (user && !user.currentCourses.includes(newEnrollment.id)) {
      user.currentCourses.push(newEnrollment.id);
    }

    return {
      success: true,
      message: `Enrolled successfully via mock iGOT API in ${newEnrollment.title}`,
      enrollment: newEnrollment
    };
  }

  async getEnrollmentStatus(userId, courseId) {
    const course = db.myLearningCourses.find(c => c.courseId === courseId || c.id === courseId);
    return {
      isEnrolled: !!course,
      progress: course ? course.progress : 0,
      status: course ? course.status : "not_enrolled"
    };
  }

  async getLearningProgress(userId) {
    return {
      inprogress: db.myLearningCourses.filter(c => c.status === 'inprogress'),
      completed: db.completedCourses,
      unenrolled: db.unenrolledCourses
    };
  }

  async getCompletedCourses(userId) {
    return db.completedCourses;
  }
}

export const mockIgotAdapter = new MockIgotAdapter();
