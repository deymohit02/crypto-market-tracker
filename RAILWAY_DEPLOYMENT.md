# CryptoPulse - Railway Deployment Guide

This guide provides step-by-step instructions for deploying CryptoPulse to Railway.

## Why Railway?

Railway is the **perfect platform** for CryptoPulse because:
- ✅ **Native Express Support**: No serverless conversion needed
- ✅ **WebSocket Support**: Real-time updates work perfectly
- ✅ **No Cold Starts**: Always-on servers (on paid tier)
- ✅ **Excellent Logging**: Easy debugging and monitoring
- ✅ **Simple Setup**: Deploy in under 10 minutes

---

## Prerequisites

- GitHub account with your CryptoPulse repository
- Credit card (required for Railway's free $5 trial)
- Your Neon Database URL (or use Railway's PostgreSQL)

---

## Quick Start Deployment

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign in with **GitHub**
4. Enter credit card info (required for $5 free trial)

### Step 2: Deploy from GitHub

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your repositories
4. Select: `deymohit02/crypto-market-tracker`
5. Railway will automatically:
   - Detect Node.js project
   - Run `npm run build`
   - Start with `npm start`

### Step 3: Add PostgreSQL Database (Optional)

If you want to use Railway's database instead of Neon:

1. In your project dashboard, click **"New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway automatically sets `DATABASE_URL` environment variable
4. Skip to Step 5

**OR** Continue to Step 4 to use your existing Neon database.

### Step 4: Configure Environment Variables

1. Click on your **web service** (not database)
2. Go to **"Variables"** tab
3. Click **"New Variable"** and add:

```bash
SESSION_SECRET=<generate-random-string>
DATABASE_URL=<your-neon-database-url>
```

**Tips:**
- Generate `SESSION_SECRET`: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- If using Railway PostgreSQL, don't add `DATABASE_URL` (auto-provided)
- Don't add `PORT` or `NODE_ENV` (Railway handles these)

### Step 5: Initialize Database Schema

After first deployment, run migrations:

**Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run npm run db:push
```

**Option B: Local Connection**
```bash
# Copy DATABASE_URL from Railway
DATABASE_URL=<railway-db-url> npm run db:push
```

### Step 6: Get Your Public URL

1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Railway provides: `https://your-app.up.railway.app`

---

## Verification

After deployment, test your application:

### 1. Open the URL
Visit your Railway URL in the browser

### 2. Check the Logs
- Click **"Deployments"** → Latest deployment
- View real-time logs
- Look for: `✅ serving on port XXXX`

### 3. Test Features
- **Cryptocurrency List**: Should display accurate prices
- **WebSocket Status**: Should show "Connected" (not "Disconnected")
- **Real-time Updates**: Prices should update automatically
- **Market Summary**: Should load without errors
- **Search**: Try searching for "Bitcoin"
- **Watchlist**: Add/remove coins

---

## Cost Breakdown

Railway pricing:

| Service | Cost (Monthly) | Notes |
|---------|----------------|-------|
| **Starter Plan** | $5 | Includes 500 hours execution |
| **PostgreSQL** | $5-10 | 1GB storage, 256MB RAM |
| **Total** | $10-15 | After free trial |

**Free Trial**: $5 credit lasts ~2-4 weeks for small apps.

> 💡 **Tip**: Use your existing Neon database to save $5-10/month!

---

## Continuous Deployment

Railway automatically deploys on every push to `main`:

```bash
git add .
git commit -m "Your changes"
git push origin main

# Railway automatically builds and deploys! ✨
```

---

## Troubleshooting

### Build Fails

**Error**: `Cannot find module`
- **Fix**: Ensure `package-lock.json` is committed
- Run: `git add package-lock.json && git commit -m "Add lockfile" && git push`

### Application Won't Start

**Error**: `EADDRINUSE` or port errors
- **Fix**: Don't set `PORT` environment variable manually
- Railway automatically provides the correct port

### Database Connection Failed

**Error**: `Connection refused`
- **Fix**: Verify `DATABASE_URL` is set correctly
- **Fix**: Run database migrations: `railway run npm run db:push`
- **Fix**: Check if Neon database is active (free tier may sleep)

### WebSocket Not Connecting

**Error**: `WebSocket connection failed`
- **Fix**: Ensure your app uses `https://` not `http://` in production
- **Fix**: Check Railway logs for WebSocket errors

---

## Environment Variables Reference

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `DATABASE_URL` | ✅ Yes | - | Auto-set if using Railway PostgreSQL |
| `SESSION_SECRET` | ✅ Yes | - | Generate securely |
| `NODE_ENV` | ❌ No | `production` | Auto-set by Railway |
| `PORT` | ❌ No | Auto-assigned | **Do not set manually** |

---

## Monitoring & Logs

### View Logs
1. Go to your service
2. Click **"Deployments"**
3. Select the latest deployment
4. View real-time logs

### Monitor Performance
- **Metrics**: Shows CPU, Memory, Network usage
- **Uptime**: Track service availability
- **Builds**: View build history and duration

---

## Rollback a Deployment

If a deployment fails:
1. Go to **"Deployments"**
2. Find a working deployment
3. Click **⋯** → **"Redeploy"**

---

## Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Click **"Custom Domain"**
3. Enter your domain name
4. Update DNS records as instructed
5. Railway handles SSL certificates automatically

---

## Migration from Vercel/Render

Your app is now optimized for Railway with:
- ✅ `railway.json` - Railway configuration
- ✅ `Procfile` - Process definition
- ✅ Existing build scripts work perfectly

No code changes needed! Just deploy and enjoy:
- 🚀 Faster performance
- 🔌 Working WebSockets
- 📊 Better logging
- ⚡ No cold starts

---

## Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: Active community support
- **GitHub Issues**: Report bugs in your repo

---

## Next Steps

1. ✅ Deploy to Railway
2. ✅ Test all features
3. 🎉 Enjoy a working deployment!

Your app is now production-ready on Railway! 🚂✨
