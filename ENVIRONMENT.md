# Environment Variables

This application requires the following environment variables to be set:

## Required Variables

### Database Configuration
- `DATABASE_URL`: PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database`
  - Example: `postgresql://myuser:mypassword@localhost:5432/reckonix_db`

### Session Configuration
- `SESSION_SECRET`: Secret key for session encryption
  - Use a strong random string in production
  - Example: `my-super-secret-session-key-123`

### Server Configuration
- `PORT`: Port number for the server (Railway sets this automatically)
- `NODE_ENV`: Environment mode (`development` or `production`)

## Railway Deployment

When deploying to Railway:
1. Railway will automatically set the `PORT` variable
2. You need to set `DATABASE_URL` and `SESSION_SECRET` in Railway's environment variables
3. Set `NODE_ENV=production` 