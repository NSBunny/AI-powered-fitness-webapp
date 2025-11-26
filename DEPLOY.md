# Deploying AI Fitness App to Vercel

This guide explains how to deploy the AI Fitness App (MERN stack) to Vercel.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host the repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Database**: You need a cloud-hosted database (e.g., Neon for PostgreSQL or MongoDB Atlas).

## Steps

### 1. Push to GitHub

If you haven't already, push your code to a GitHub repository.

```bash
git init
git add .
git commit -m "Ready for deployment"
# Create a new repo on GitHub and follow instructions to push
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1.  Go to your Vercel Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.

### 3. Configure Project

Vercel should automatically detect the settings from `vercel.json`, but double-check:

-   **Framework Preset**: Other (or Vite if it detects the client, but `vercel.json` handles the build).
-   **Root Directory**: `./` (Leave as default).

### 4. Environment Variables

**CRITICAL**: You must add your environment variables in the Vercel Project Settings.

Go to **Settings** -> **Environment Variables** and add:

-   `MONGO_URI`: Your MongoDB connection string.
-   `PG_URI`: Your PostgreSQL connection string.
-   `JWT_SECRET`: Your secret key for JWT.
-   `GEMINI_API_KEY`: Your Google Gemini API key.
-   `PORT`: (Optional, Vercel handles this, but you can set it to 5000 if needed).

### 5. Deploy

Click **Deploy**. Vercel will:
1.  Install dependencies (from root `package.json`).
2.  Build the client (using `client/package.json` script).
3.  Deploy the serverless functions.

## Troubleshooting

-   **500 Errors**: Check the "Logs" tab in Vercel. It usually means a missing environment variable or a database connection error.
-   **CORS Issues**: Ensure your `cors` configuration in `server/index.js` allows the Vercel domain. You might need to update it to:
    ```javascript
    app.use(cors({
        origin: ['https://your-app.vercel.app', 'http://localhost:5173'],
        credentials: true
    }));
    ```
