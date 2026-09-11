import { db } from '../data/db.js';

export const notificationService = {
  getNotifications: async () => {
    return db.notifications;
  },

  markAsRead: async (id) => {
    const notif = db.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      return notif;
    }
    return null;
  },

  createNotification: async ({ title, description, priority = "medium", actionLink = "" }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      description,
      time: "Just now",
      priority,
      read: false,
      actionLink,
      date: new Date().toISOString()
    };
    db.notifications.unshift(newNotif);
    return newNotif;
  }
};
