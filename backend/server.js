import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config/config.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/errorMiddleware.js';
import { connectDatabase, getDbStatus } from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import competencyRoutes from './routes/competencyRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import learningRoutes from './routes/learningRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import integrationRoutes from './routes/integrationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || config.port || 5000;

// Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: "GyanMitra Official Statistical Intelligence Backend",
    phase: "Phase 1 - MongoDB Integrated Architecture",
    status: "operational",
    database: getDbStatus(),
    ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
    partners: ["NSSTA Academy", "iGOT Karmayogi Bharat"],
    timestamp: new Date().toISOString()
  });
});

// Mount Phase 1 Routers
app.use('/api/auth', authRoutes);
app.use('/api/competencies', competencyRoutes);
app.use('/api/skill-gaps', (req, res, next) => {
  if (req.path === '/' || req.path === '') {
    req.url = '/gaps';
  }
  next();
}, competencyRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`[GyanMitra Express API] Server running on http://localhost:${PORT}`);
  console.log(`[GyanMitra Express API] MongoDB Integrated & demo-ready backend active.`);
  await connectDatabase();
});


