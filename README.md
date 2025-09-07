# 🔧 OpenSource Issue Tracker - Backend API

A robust Node.js/Express backend API for the OpenSource Issue Tracker application, providing data scraping, GitHub API integration, and issue management services.

## ✨ Features

- 🐙 **GitHub API Integration**: Full integration with GitHub REST API
- 🔍 **Issue Scraping**: Automated scraping of open source issues
- 🏢 **OpenSourceOrganization Data**: Specialized endpoints for Google Summer of Code organizations
- 📊 **Data Management**: MongoDB integration for data persistence
- 🚀 **High Performance**: Optimized with rate limiting and caching
- 📝 **Comprehensive Logging**: Winston-based logging system
- 🔒 **CORS Support**: Proper CORS configuration for frontend integration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Web Scraping**: Puppeteer, Playwright, Cheerio
- **Logging**: Winston
- **HTTP Client**: Axios
- **Process Management**: Concurrently, Nodemon

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- GitHub Personal Access Token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/OpenSourceIssueTracker.server.git
   cd OpenSourceIssueTracker.server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=7000
   FRONTEND_URL=http://localhost:3000
   DB_URL=mongodb://localhost:27017/opensource_issue_tracker
   GITHUB_TOKEN=your-github-personal-access-token
   GITHUB_API_URL=https://api.github.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   LOG_LEVEL=info
   LOG_FILE=logs/app.log
   CORS_ORIGINS=http://localhost:3000,https://your-domain.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
OpenSourceIssueTracker.server/
├── src/
│   ├── controllers/          # Route controllers
│   │   ├── data/            # Data-related controllers
│   │   ├── gsoc/            # GSoC-specific controllers
│   │   └── issueController.ts
│   ├── services/            # Business logic services
│   │   ├── github.ts        # GitHub API service
│   │   └── gsoc.ts          # OpenSourcedata service
│   ├── routes/              # Express routes
│   │   ├── data.ts          # Data routes
│   │   ├── gsoc.ts          # OpenSourceroutes
│   │   └── issueRoutes.ts   # Issue routes
│   ├── db/                  # Database configuration
│   │   └── db.ts
│   ├── utils/               # Utility functions
│   │   ├── scraper.ts       # Web scraping utilities
│   │   └── winstonLogger.ts # Logging configuration
│   ├── config/              # Configuration files
│   │   └── env.ts
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
├── dist/                    # Compiled JavaScript (generated)
├── logs/                    # Log files (generated)
├── .env.example             # Environment variables template
└── README.md               # This file
```

## 🔑 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `PORT` | Server port | `7000` | No |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` | Yes |
| `DB_URL` | MongoDB connection string | - | Yes |
| `GITHUB_TOKEN` | GitHub Personal Access Token | - | Yes |
| `GITHUB_API_URL` | GitHub API base URL | `https://api.github.com` | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | `900000` | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` | No |
| `LOG_LEVEL` | Logging level | `info` | No |
| `LOG_FILE` | Log file path | `logs/app.log` | No |
| `CORS_ORIGINS` | Allowed CORS origins | - | No |

## 📚 API Endpoints

### Data Endpoints
- `GET /api/data` - Get all available data
- `GET /api/data/refresh` - Refresh data from sources

### OpenSourceEndpoints
- `GET /api/gsoc/organizations` - Get OpenSourceorganizations
- `GET /api/gsoc/issues` - Get GSoC-related issues
- `GET /api/gsoc/org/:orgId` - Get specific organization details

### Issue Endpoints
- `GET /api/issues` - Get all issues
- `GET /api/issues/:org/:repo` - Get issues for specific repository
- `GET /api/issues/search` - Search issues with filters

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint (if configured)

### Database Setup

1. **Local MongoDB**
   ```bash
   # Install MongoDB locally
   # Start MongoDB service
   # Update DB_URL in .env
   ```

2. **MongoDB Atlas**
   ```bash
   # Create cluster on MongoDB Atlas
   # Get connection string
   # Update DB_URL in .env
   ```

### GitHub Token Setup

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token with required scopes:
   - `repo` (for private repositories)
   - `public_repo` (for public repositories)
   - `read:org` (for organization data)
3. Add token to your `.env` file

## 🚀 Deployment

### Railway

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Heroku

1. Create Heroku app
2. Set environment variables
3. Deploy using Git

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7000
CMD ["npm", "start"]
```

## 📊 Monitoring & Logging

- **Winston Logger**: Comprehensive logging system
- **Log Levels**: error, warn, info, debug
- **Log Files**: Stored in `logs/` directory
- **Console Output**: Development mode shows logs in console

## 🔒 Security

- **CORS**: Properly configured for frontend integration
- **Rate Limiting**: Prevents API abuse
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Request validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub for providing the comprehensive API
- MongoDB for the excellent database solution
- The Express.js team for the robust framework
- The open source community for their contributions

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/OpenSourceIssueTracker.server/issues) page
2. Create a new issue if your question isn't answered
3. Contact the maintainers

---

**Happy Coding! 🎉**
