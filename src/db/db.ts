import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db: mongoose.Connection;

const ConnectToDB = async (): Promise<mongoose.Connection> => {
  const DatabaseUrl = process.env.DB_URL as string;
  
  if (!DatabaseUrl) {
    console.error("❌ DB_URL environment variable is not set!");
    process.exit(1);
  }
  
  console.log("🔗 Connecting to database:", DatabaseUrl);
  
  try {
    await mongoose.connect(DatabaseUrl);
    db = mongoose.connection;
    
    // Handle connection events
    db.on('error', (error) => {
      console.error("❌ Database connection error:", error);
    });
    
    db.on('disconnected', () => {
      console.warn("⚠️ Database disconnected");
    });
    
    db.on('reconnected', () => {
      console.log("✅ Database reconnected");
    });
    
    console.log("✅ Database connected successfully");
    return db;
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  }
};

// Export a function to get the database connection
export const getDb = (): mongoose.Connection => {
  if (!db) {
    throw new Error("Database not connected. Make sure to call ConnectToDB() first.");
  }
  
  // Check if the connection is still active
  if (db.readyState !== 1) {
    throw new Error(`Database connection is not ready. Current state: ${db.readyState}. Please check your database connection.`);
  }
  
  return db;
};

export { db };
export default ConnectToDB;