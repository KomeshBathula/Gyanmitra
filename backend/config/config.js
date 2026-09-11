import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from backend/.env or parent .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'gyanmitra-phase1-prototype-secret-2026',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  phase: 'Phase 1 - Prototype Mock Architecture',
  defaultUser: 'usr_001',
  systemName: 'GyanMitra Official Statistics Competency Intelligence Platform',
  groqApiKey: process.env.GROQ_API_KEY || '',
  groqModel: process.env.GROQ_MODEL || 'qwen/qwen3.8-27b'
};
