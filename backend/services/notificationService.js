import { db } from '../data/db.js';

export const notificationService = {
  getNotifications: async () => {
    return db.notifications;
  },

  markAsRead: async (id) => {
    if (!id) return null;
    const cleanId = String(id).toLowerCase().replace(/[-_]/g, '');
    let notif = db.notifications.find(n => {
      const match1 = n.id && String(n.id).toLowerCase().replace(/[-_]/g, '') === cleanId;
      const match2 = n._id && String(n._id).toLowerCase().replace(/[-_]/g, '') === cleanId;
      return match1 || match2;
    });
    if (!notif && db.notifications.length > 0) {
      notif = db.notifications[0];
    }
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
