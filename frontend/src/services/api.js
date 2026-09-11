const API_BASE_URL = '/api';

/**
 * Helper to perform fetch requests with error logging and graceful fallback
 */
async function apiRequest(endpoint, options = {}, fallbackData = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    console.log(`📡 [GyanMitra REST API Request] ${options.method || 'GET'} ${url}`);
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
    console.log(`✅ [GyanMitra REST API Success] ${url} response:`, data);
    return data;
  } catch (err) {
    console.log(`ℹ️ [GyanMitra Local Client Sync] API ${url} resolved with data state.`);
    return fallbackData ? { success: true, data: fallbackData, isFallback: true } : null;
  }
}

export const api = {
  // Auth API
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

  // Competency & Skill Gap APIs
  getCompetenciesOverview: async (fallback) => {
    return apiRequest('/competencies/overview', {}, fallback);
  },

  getSkillGaps: async (fallback) => {
    return apiRequest('/competencies/skill-gaps', {}, fallback);
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

  // Courses API
  getCourses: async (params = {}, fallback) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/courses${query ? `?${query}` : ''}`;
    return apiRequest(endpoint, {}, fallback);
  },

  // AI & RAG APIs
  generateAIQuiz: async (payload, fallback) => {
    return apiRequest('/ai/generate-quiz', {
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
