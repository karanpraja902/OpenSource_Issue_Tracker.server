"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const dotenv_1 = require("dotenv");
const gsoc_1 = __importDefault(require("./routes/gsoc"));
const data_1 = __importDefault(require("./routes/data"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_winston_1 = __importDefault(require("express-winston"));
const winston_1 = __importDefault(require("winston"));
// Load environment variables
(0, dotenv_1.config)({
    path: "./.env",
});
exports.app = (0, express_1.default)();
exports.app.use(express_winston_1.default.logger({
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.cli()),
    meta: true,
    expressFormat: true,
    colorize: true,
}));
// Middleware
exports.app.use(((0, cookie_parser_1.default)()));
exports.app.use(express_1.default.json());
exports.app.use((0, express_1.urlencoded)({ extended: true }));
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // Allow Vercel deployments
        if (/\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }
        // Allow localhost with any port in development
        if (process.env.NODE_ENV === 'development' && /^http:\/\/localhost:\d+$/.test(origin)) {
            return callback(null, true);
        }
        console.warn(`⚠️ CORS blocked request from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.app.use((0, cors_1.default)(corsOptions));
// Routes
exports.app.get('/', async (req, res) => {
    res.send('Server is working!');
});
exports.app.use('/api/gsoc', gsoc_1.default);
exports.app.use('/api/data', data_1.default);
// Error handling middleware
exports.app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    if (err.message === "Not allowed by CORS") {
        res.status(403).json({
            success: false,
            message: "CORS Error: Origin not allowed",
            error: process.env.NODE_ENV === 'development' ? err.message : "Forbidden"
        });
        return;
    }
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
    });
});
// 404 handler
exports.app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl
    });
});
