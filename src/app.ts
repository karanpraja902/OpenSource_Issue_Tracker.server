import express, { Application, urlencoded } from 'express';
import {config} from 'dotenv';
import goscRoutes from './routes/gsoc';
import dataRoutes from './routes/data';
import cors from 'cors';
import cookieParser from "cookie-parser";
import expressWinston from "express-winston";
import winston from "winston";

// Load environment variables
config({
    path: "./.env",
  });
  

export const app: Application = express();
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.cli()
    ),
    meta: true,
    expressFormat: true,
    colorize: true,
  })
);


// Middleware
app.use((cookieParser()));
app.use(express.json());
app.use(urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

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

app.use(cors(corsOptions));

// Routes
app.get('/', async (req, res) => {
    res.send('Server is working!');
});

app.use('/api/gsoc', goscRoutes);
app.use('/api/data', dataRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

