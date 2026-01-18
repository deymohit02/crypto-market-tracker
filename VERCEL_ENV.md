# Environment Variables for Vercel Deployment

Copy these environment variables to your Vercel project settings.

## Required Variables

### DATABASE_URL
Your Neon PostgreSQL connection string (from .env file)
```
postgresql://user:password@host:port/database?sslmode=require
```

### SESSION_SECRET
A secure random string for session encryption
```
Generate a new one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Or use: dev-secret-1234567890 (for testing only)
```

### NODE_ENV
Environment setting
```
production
```

---

## How to Add to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable above with its value
4. Make sure to select **Production** environment
5. Click **Save**

**IMPORTANT**: After adding environment variables, you must redeploy your project for them to take effect.
