import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'gyanmitra-phase1-prototype-secret-2026',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  phase: 'Phase 1 - Prototype Mock Architecture',
  defaultUser: 'usr_001',
  systemName: 'GyanMitra Official Statistics Competency Intelligence Platform'
};
