import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db: mongoose.Connection;

const ConnectToDB = async () => {
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
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  }
};

export { db };
export default ConnectToDB;