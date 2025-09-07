"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db;
const ConnectToDB = async () => {
    const DatabaseUrl = process.env.DB_URL;
    if (!DatabaseUrl) {
        console.error("❌ DB_URL environment variable is not set!");
        process.exit(1);
    }
    console.log("🔗 Connecting to database:", DatabaseUrl);
    try {
        await mongoose_1.default.connect(DatabaseUrl);
        exports.db = db = mongoose_1.default.connection;
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
    }
    catch (error) {
        console.error("❌ Error connecting to database:", error);
        process.exit(1);
    }
};
exports.default = ConnectToDB;
