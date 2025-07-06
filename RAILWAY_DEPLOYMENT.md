# Railway Deployment Guide for ReckonixCalibration

This guide will walk you through deploying your ReckonixCalibration application to Railway.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Railway Account**: Sign up at [railway.app](https://railway.app)
3. **PostgreSQL Database**: You'll need a database (Railway provides this)

## Step 1: Prepare Your Repository

Your project is already configured with the necessary files:
- `railway.toml` - Railway configuration
- `Procfile` - Process definition
- `.nixpacks` - Build configuration
- Updated `server/index.ts` - Production-ready server

## Step 2: Set Up Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Create a new project

## Step 3: Deploy Your Application

### Option A: Deploy from GitHub (Recommended)

1. **Connect GitHub Repository**:
   - In Railway dashboard, click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your ReckonixCalibration repository
   - Railway will automatically detect it's a Node.js project

2. **Configure Environment Variables**:
   - Go to your project's "Variables" tab
   - Add the following environment variables:
     ```
     NODE_ENV=production
     SESSION_SECRET=your-super-secret-session-key-here
     ```

3. **Set Up Database**:
   - In Railway dashboard, click "New Service"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically create a PostgreSQL database
   - Copy the `DATABASE_URL` from the database service
   - Add it to your main service's environment variables

### Option B: Deploy with Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize and Deploy**:
   ```bash
   railway init
   railway up
   ```

## Step 4: Configure Environment Variables

In your Railway project dashboard, set these environment variables:

### Required Variables:
```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
SESSION_SECRET=your-super-secret-session-key-here
```

### Optional Variables:
```
PORT=5000 (Railway sets this automatically)
```

## Step 5: Database Setup

1. **Automatic Migration**: The `postinstall` script will automatically run database migrations
2. **Manual Migration** (if needed):
   - Go to your Railway project
   - Open the database service
   - Use the database console to run migrations manually

## Step 6: Verify Deployment

1. **Check Build Logs**: Monitor the build process in Railway dashboard
2. **Test Your Application**: Visit the provided Railway URL
3. **Check Database Connection**: Verify your app can connect to the database

## Step 7: Custom Domain (Optional)

1. Go to your Railway project settings
2. Click "Domains"
3. Add your custom domain
4. Configure DNS settings as instructed

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check build logs in Railway dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is correctly set
   - Check if database service is running
   - Ensure database migrations have run

3. **Port Issues**:
   - Railway automatically sets the `PORT` environment variable
   - Your app should listen on `process.env.PORT || 5000`

4. **Static File Issues**:
   - Ensure Vite build is completing successfully
   - Check if static files are being served correctly

### Debug Commands:

```bash
# Check Railway logs
railway logs

# Access Railway shell
railway shell

# Check environment variables
railway variables
```

## Monitoring and Maintenance

1. **Logs**: Monitor application logs in Railway dashboard
2. **Metrics**: Track performance and resource usage
3. **Updates**: Railway automatically redeploys on git push
4. **Scaling**: Adjust resources as needed in Railway dashboard

## Cost Optimization

- Railway offers a free tier with limitations
- Monitor usage to avoid unexpected charges
- Consider using Railway's usage-based pricing

## Security Best Practices

1. **Environment Variables**: Never commit secrets to your repository
2. **Database Security**: Use Railway's managed PostgreSQL
3. **HTTPS**: Railway provides automatic HTTPS
4. **Session Security**: Use a strong `SESSION_SECRET`

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure custom domain
3. Set up CI/CD pipeline
4. Implement backup strategies
5. Monitor performance and optimize

---

**Need Help?**
- Railway Documentation: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- GitHub Issues: Create an issue in your repository 