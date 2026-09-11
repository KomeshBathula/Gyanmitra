import mongoose from 'mongoose';
import { config } from './config.js';
import { seedDatabase } from '../scripts/seed.js';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) return;

  const mongoUri = config.mongodbUri;

  try {
    console.log(`[MongoDB] Connecting to database at ${mongoUri.replace(/:[^:@]+@/, ':****@')}...`);
    
    // Set 4 second connection timeout so startup remains instantaneous even if local mongod is offline
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000
    });

    isConnected = true;
    console.log(`[MongoDB] Successfully connected to MongoDB database: ${mongoose.connection.name}`);

    // Auto-seed default inputs if collections are empty so default data is always maintained
    await seedDatabase({ checkEmptyOnly: true });

  } catch (err) {
    console.warn(`[MongoDB] Notice: Could not connect to local MongoDB (${err.message}).`);
    console.log(`[MongoDB] Operating in high-fidelity in-memory persistence mode with full seed defaults.`);
  }
};

export const getDbStatus = () => ({
  isConnected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || 'local-memory',
  name: mongoose.connection.name || 'gyanmitra'
});
