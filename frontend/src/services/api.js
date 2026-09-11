const API_BASE_URL = '/api';

/**
 * Helper to perform fetch requests with error logging and graceful fallback
 */
async function apiRequest(endpoint, options = {}, fallbackData = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(`[GyanMitra API] ${url} fetch issue, using offline sync:`, err.message);
    return fallbackData ? { success: true, data: fallbackData, isFallback: true } : null;
  }
}

export const api = {
  // Auth & Profile APIs
  login: async (credentials, fallback) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }, fallback);
  },

  getProfile: async (fallback) => {
    return apiRequest('/auth/profile', {}, fallback);
  },

  updateProfile: async (profileData, fallback) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }, fallback);
  },

  getNotifications: async (fallback) => {
    return apiRequest('/auth/notifications', {}, fallback);
  },

  // Courses & Explore Catalog APIs
  getCourses: async (params = {}, fallback) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/courses${query ? `?${query}` : ''}`;
    return apiRequest(endpoint, {}, fallback);
  },

  getCourseById: async (id, fallback) => {
    return apiRequest(`/courses/${id}`, {}, fallback);
  },

  // Marketplace APIs
  getMarketplaceProviders: async (search = '', fallback) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiRequest(`/courses/marketplace/providers${query}`, {}, fallback);
  },

  getMarketplaceAR: async (fallback) => {
    return apiRequest('/courses/marketplace/ar', {}, fallback);
  },

  // My Learning APIs
  getMyLearning: async (status = '', fallback) => {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return apiRequest(`/courses/my-learning/all${query}`, {}, fallback);
  },

  enrollCourse: async (courseData, fallback) => {
    return apiRequest('/courses/enroll', {
      method: 'POST',
      body: JSON.stringify(courseData)
    }, fallback);
  },

  updateCourseProgress: async (courseId, progress, fallback) => {
    return apiRequest('/courses/progress', {
      method: 'PUT',
      body: JSON.stringify({ courseId, progress })
    }, fallback);
  },

  // Competencies & ACBP APIs
  getCompetenciesOverview: async (fallback) => {
    return apiRequest('/competencies/overview', {}, fallback);
  },

  getSkillGaps: async (fallback) => {
    return apiRequest('/competencies/skill-gaps', {}, fallback);
  },

  getGapDetail: async (gapId, fallback) => {
    return apiRequest(`/competencies/gap/${gapId}`, {}, fallback);
  },

  getLearningPath: async (fallback) => {
    return apiRequest('/competencies/learning-path', {}, fallback);
  },

  updateCompetencyFromAssessment: async (payload, fallback) => {
    return apiRequest('/competencies/update-from-assessment', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, fallback);
  },

  // AI & RAG APIs
  generateAIQuiz: async (payload, fallback) => {
    return apiRequest('/ai/generate-quiz', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, fallback);
  },

  getGeneratedQuizzes: async (fallback) => {
    return apiRequest('/ai/quizzes', {}, fallback);
  },

  getGeneratedQuizById: async (id, fallback) => {
    return apiRequest(`/ai/quizzes/${id}`, {}, fallback);
  },

  submitAIQuiz: async (payload, fallback) => {
    return apiRequest('/ai/quiz-submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, fallback);
  },

  sendAIChat: async (message, fallback) => {
    return apiRequest('/ai/assistant-chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    }, fallback);
  },

  // Trainer & Admin APIs
  getTrainerSummary: async (fallback) => {
    return apiRequest('/trainer/batch-summary', {}, fallback);
  },

  getAdminWorkforce: async (fallback) => {
    return apiRequest('/admin/workforce-intelligence', {}, fallback);
  },

  // Reports API
  getReports: async (fallback) => {
    return apiRequest('/reports', {}, fallback);
  }
};
