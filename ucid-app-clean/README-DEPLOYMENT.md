# UCID App - Production Deployment Guide

## 📋 Prerequisites

### Required Software
- **Python 3.9+** with pip
- **Node.js 18+** with npm
- **PostgreSQL 14+**
- **Git**

### Required Accounts
- PostgreSQL database (local or cloud like AWS RDS, Heroku Postgres, or Supabase)
- API keys for LLM (optional but recommended):
  - Anthropic Claude API key, OR
  - OpenAI API key

---

## 🚀 Local Development Setup

### 1. Clone and Install

```bash
# Navigate to project
cd "/Users/johnviolette/UC | App Design Master/ucid-app-clean"

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Database Setup

```bash
# Install PostgreSQL (if not installed)
# macOS:
brew install postgresql
brew services start postgresql

# Create database
createdb ucid_app

# Initialize schema
cd backend
python init_db.py
```

### 3. Environment Configuration

Create `.env` file in `ucid-app-clean/` root:

```env
# Database
DATABASE_URL=postgresql://localhost:5432/ucid_app

# Security
SECRET_KEY=your-super-secret-key-change-this

# LLM API Keys (optional)
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key

# Environment
NODE_ENV=development
FLASK_ENV=development
```

Create `.env` in `ucid-app-clean/backend/`:

```env
DATABASE_URL=postgresql://localhost:5432/ucid_app
SECRET_KEY=your-super-secret-key-change-this
ANTHROPIC_API_KEY=your-anthropic-key
```

### 4. Run Development Servers

#### Terminal 1 - Backend (Port 5000)
```bash
cd backend
python app.py
```

#### Terminal 2 - Frontend (Port 3000)
```bash
npm run dev
```

#### Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

---

## 🌐 Production Deployment

### Option A: Heroku (Easiest)

#### 1. Prepare Files

Create `Procfile` in root:
```
web: gunicorn backend.app:app
```

Create `runtime.txt`:
```
python-3.11.0
```

#### 2. Deploy

```bash
# Login to Heroku
heroku login

# Create app
heroku create ucid-career-explorer

# Add PostgreSQL
heroku addons:create heroku-postgresql:essential-0

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set ANTHROPIC_API_KEY=your-api-key

# Deploy
git push heroku main

# Initialize database
heroku run python backend/init_db.py
```

### Option B: AWS (More Control)

#### Backend - AWS Elastic Beanstalk

1. Install EB CLI:
```bash
pip install awsebcli
```

2. Initialize:
```bash
cd backend
eb init -p python-3.11 ucid-backend --region us-east-1
```

3. Create environment:
```bash
eb create ucid-production
```

4. Set environment variables:
```bash
eb setenv SECRET_KEY=your-secret DATABASE_URL=your-postgres-url
```

#### Frontend - AWS S3 + CloudFront

1. Build frontend:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://ucid-app-frontend --acl public-read
```

3. Set up CloudFront distribution pointing to S3 bucket

### Option C: DigitalOcean (Cost-Effective)

#### 1. Create Droplet
- Ubuntu 22.04
- 2GB RAM minimum
- Choose datacenter region

#### 2. Setup Server

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Install dependencies
apt update && apt upgrade -y
apt install -y python3-pip postgresql nginx nodejs npm

# Clone repository
git clone your-repo-url
cd ucid-app-clean

# Setup Python environment
pip3 install -r backend/requirements.txt

# Setup database
sudo -u postgres createdb ucid_app
python3 backend/init_db.py

# Build frontend
npm install
npm run build

# Setup Nginx
nano /etc/nginx/sites-available/ucid
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/ucid-app-clean/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 3. Setup Process Manager

```bash
# Install PM2
npm install -g pm2

# Start backend
pm2 start backend/app.py --name ucid-backend --interpreter python3

# Save PM2 config
pm2 save
pm2 startup
```

---

## 🔒 Security Checklist

### Before Production

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `FLASK_ENV=production`
- [ ] Enable HTTPS (Let's Encrypt + Certbot)
- [ ] Configure CORS to only allow your frontend domain
- [ ] Set up database backups
- [ ] Enable PostgreSQL SSL connections
- [ ] Review FERPA compliance requirements
- [ ] Set up error logging (Sentry, CloudWatch)
- [ ] Configure rate limiting
- [ ] Enable database connection pooling

### Environment Variables (Production)

```env
DATABASE_URL=postgresql://user:pass@host:5432/ucid_app?sslmode=require
SECRET_KEY=use-a-long-random-string-here
FLASK_ENV=production
NODE_ENV=production
CORS_ORIGINS=https://your-domain.com
ANTHROPIC_API_KEY=your-key
```

---

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Backend health
curl https://your-api.com/api/health

# Database check
psql $DATABASE_URL -c "SELECT COUNT(*) FROM users;"
```

### Logs

```bash
# Heroku
heroku logs --tail

# PM2
pm2 logs ucid-backend

# Docker
docker logs ucid-backend
```

### Database Backups

```bash
# Manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20250108.sql
```

---

## 🧪 Testing Production

### 1. Smoke Tests

```bash
# API health
curl https://your-api.com/api/health

# User signup
curl -X POST https://your-api.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@uc.edu","password":"test123","firstName":"Test","lastName":"User"}'
```

### 2. Load Testing

```bash
# Install k6
brew install k6

# Run load test
k6 run tests/load-test.js
```

---

## 🆘 Troubleshooting

### Database Connection Issues

```python
# Test connection
import psycopg2
conn = psycopg2.connect("your-database-url")
print("Connected!")
```

### CORS Errors

Update `backend/app.py`:
```python
CORS(app, resources={r"/api/*": {"origins": ["https://your-frontend.com"]}})
```

### Build Failures

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

---

## 📞 Support

For deployment issues:
1. Check logs first
2. Review error messages
3. Verify environment variables
4. Test database connection
5. Check API health endpoint

---

## 🎓 Grant Compliance

### FERPA Requirements
- All student data encrypted in transit (HTTPS)
- Encrypted at rest (PostgreSQL encryption)
- Access logs maintained
- Data retention policy documented
- User data deletion capability

### Required Documentation
- Privacy policy
- Terms of service
- Data handling procedures
- Incident response plan

