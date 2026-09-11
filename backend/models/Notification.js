import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  userId: { type: String, default: 'usr_001' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['mandate', 'training', 'assessment', 'general'], default: 'general' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  source: { type: String, default: 'MoSPI / NSSTA' },
  date: { type: String, default: 'Today' },
  isRead: { type: Boolean, default: false }
}, {
  timestamps: true,
  _id: false
});

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
