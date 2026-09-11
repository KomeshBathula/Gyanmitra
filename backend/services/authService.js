import { db } from '../data/db.js';
import { config } from '../config/config.js';

export const authService = {
  login: async ({ email, role = 'employee' }) => {
    let user;
    const normalizedRole = (role || 'employee').toLowerCase();

    if (normalizedRole === 'trainer') {
      user = db.users.find(u => u.role.toLowerCase() === 'trainer') || db.users[2];
    } else if (normalizedRole === 'admin') {
      user = db.users.find(u => u.role.toLowerCase() === 'admin') || db.users[3];
    } else {
      user = db.users.find(u => u.email === email) || db.users[0];
    }

    const token = `jwt-igot-karmayogi-${user._id}-${Date.now()}`;

    return {
      token,
      user,
      session: {
        role: user.role,
        authProvider: "Parichay Single Sign-On (Govt of India)",
        expiresIn: "8h"
      }
    };
  },

  getCurrentUser: async (userId) => {
    const user = db.users.find(u => u._id === (userId || config.defaultUser)) || db.users[0];
    return user;
  },

  updateProfile: async (userId, profileData) => {
    const userIndex = db.users.findIndex(u => u._id === (userId || config.defaultUser));
    const targetIndex = userIndex !== -1 ? userIndex : 0;

    db.users[targetIndex] = {
      ...db.users[targetIndex],
      ...profileData
    };

    return db.users[targetIndex];
  }
};
