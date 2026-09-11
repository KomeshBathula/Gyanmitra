import { db } from '../data/db.js';
import { config } from '../config/config.js';
import { User } from '../models/User.js';
import mongoose from 'mongoose';

export const authService = {
  login: async ({ email, role = 'employee' }) => {
    let user;
    const normalizedRole = (role || 'employee').toLowerCase();

    if (mongoose.connection.readyState === 1) {
      try {
        if (normalizedRole === 'trainer') {
          user = await User.findOne({ role: { $regex: /trainer/i } }).lean();
        } else if (normalizedRole === 'admin') {
          user = await User.findOne({ role: { $regex: /admin/i } }).lean();
        } else if (email) {
          user = await User.findOne({ email }).lean();
        }
      } catch (err) {
        console.warn("[AuthService] DB query issue, falling back to cache:", err.message);
      }
    }

    if (!user) {
      if (normalizedRole === 'trainer') {
        user = db.users.find(u => u.role?.toLowerCase() === 'trainer') || db.users[1];
      } else if (normalizedRole === 'admin') {
        user = db.users.find(u => u.role?.toLowerCase() === 'admin') || db.users[2];
      } else {
        user = db.users.find(u => u.email === email) || db.users[0];
      }
    }

    const token = `jwt-igot-karmayogi-${user?._id || 'usr_001'}-${Date.now()}`;

    return {
      token,
      user,
      session: {
        role: user?.role || 'EMPLOYEE',
        authProvider: "Parichay Single Sign-On (Govt of India)",
        expiresIn: "8h"
      }
    };
  },

  getCurrentUser: async (userId) => {
    if (mongoose.connection.readyState === 1) {
      try {
        const found = await User.findById(userId || config.defaultUser).lean();
        if (found) return found;
      } catch (err) {}
    }
    const user = db.users.find(u => u._id === (userId || config.defaultUser)) || db.users[0];
    return user;
  },

  updateProfile: async (userId, profileData) => {
    const targetId = userId || config.defaultUser;
    if (mongoose.connection.readyState === 1) {
      try {
        const updated = await User.findByIdAndUpdate(targetId, { $set: profileData }, { returnDocument: 'after' }).lean();
        if (updated) {
          const idx = db.users.findIndex(u => u._id === targetId);
          if (idx !== -1) db.users[idx] = updated;
          return updated;
        }
      } catch (err) {}
    }

    const userIndex = db.users.findIndex(u => u._id === targetId);
    const targetIndex = userIndex !== -1 ? userIndex : 0;

    db.users[targetIndex] = {
      ...db.users[targetIndex],
      ...profileData
    };

    return db.users[targetIndex];
  }
};

