import { db } from '../data/db.js';
import { skillGapService } from './skillGapService.js';

export const learningService = {
  getPersonalizedPathway: async (userId) => {
    const gaps = await skillGapService.getUserSkillGaps(userId);
    const activeGaps = gaps.filter(g => g.gap > 0);

    const pathway = activeGaps.map((gap, index) => {
      const stepNumber = index + 1;
      const matchedCourse = db.coursesCatalog.find(
        c => c.competency?.toLowerCase().includes(gap.competency.toLowerCase())
      ) || db.coursesCatalog[index % db.coursesCatalog.length];

      return {
        step: stepNumber,
        id: `path-${stepNumber}`,
        title: matchedCourse?.title || `Mastering ${gap.competency}`,
        provider: matchedCourse?.provider || "iGOT Karmayogi",
        duration: matchedCourse?.duration || "15 Hours",
        skillLevel: `Level ${gap.targetLevel}`,
        competency: gap.competency,
        why: gap.why,
        status: stepNumber === 1 ? "current" : "upcoming",
        progress: stepNumber === 1 ? 40 : 0,
        score: stepNumber === 1 ? "In Progress" : "Pending",
        completionDate: `Target Q${Math.min(4, stepNumber)} 2026`
      };
    });

    const resultRoadmap = pathway.length > 0 ? pathway : [];
    return {
      roadmap: resultRoadmap,
      steps: resultRoadmap,
      totalSteps: resultRoadmap.length,
      pathway: resultRoadmap
    };
  },

  getMyLearning: async (status = '') => {
    if (status === 'completed') {
      return { total: db.completedCourses.length, courses: db.completedCourses, data: db.completedCourses };
    }
    if (status === 'unenrolled') {
      return { total: db.unenrolledCourses.length, courses: db.unenrolledCourses, data: db.unenrolledCourses };
    }
    const allCourses = [...db.myLearningCourses, ...db.completedCourses, ...db.unenrolledCourses];
    return {
      courses: allCourses,
      total: allCourses.length,
      inprogress: db.myLearningCourses,
      completed: db.completedCourses,
      unenrolled: db.unenrolledCourses
    };
  },

  updateCourseProgress: async (courseId, progress) => {
    const course = db.myLearningCourses.find(c => c.id === courseId || c.courseId === courseId);
    if (!course) return null;

    course.progress = Math.min(100, Math.max(0, progress));
    if (course.progress === 100) {
      course.status = 'completed';
      course.completedOn = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      if (!db.completedCourses.some(c => c.id === course.id)) {
        db.completedCourses.push(course);
      }
    }
    return course;
  }
};
