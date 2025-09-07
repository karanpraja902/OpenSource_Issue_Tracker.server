"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = __importDefault(require("./db/db"));
const winstonLogger_1 = require("./utils/winstonLogger");
const PORT = process.env.PORT || 7000;
// Validate required environment variables
const requiredEnvVars = ['DB_URL', 'GITHUB_TOKEN'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
    console.error("Please check your .env file and ensure all required variables are set.");
    process.exit(1);
}
// Connect to database and start server
const startServer = async () => {
    try {
        // Wait for database connection
        await (0, db_1.default)();
        // Start the server
        const server = app_1.app.listen(PORT, () => {
            winstonLogger_1.logger.info(`🚀 Server is running on http://localhost:${PORT}`);
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use. Please kill the process using this port or use a different port.`);
                process.exit(1);
            }
            else {
                console.error('❌ Server error:', error);
                process.exit(1);
            }
        });
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('🛑 SIGTERM received, shutting down gracefully');
            server.close(() => {
                console.log('✅ Process terminated');
                process.exit(0);
            });
        });
        process.on('SIGINT', () => {
            console.log('🛑 SIGINT received, shutting down gracefully');
            server.close(() => {
                console.log('✅ Process terminated');
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
