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



app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

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

