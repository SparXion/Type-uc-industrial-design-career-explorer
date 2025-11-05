# PostgreSQL Setup Guide for UCID App

## Current Status

✅ **XAI API Key**: Deleted (secured)  
✅ **AWS Access Key**: Deleted (secured)  
✅ **MongoDB**: Not in use (paused/inactive)  
❓ **PostgreSQL**: Not yet set up

---

## PostgreSQL Setup Options

You have **two options** for setting up PostgreSQL:

### Option 1: Docker (Recommended - Easiest)

PostgreSQL will run in a container - no local installation needed.

### Option 2: Local Installation

Install PostgreSQL directly on your Mac.

---

## 🐳 Option 1: Docker Setup (Recommended)

### Prerequisites
- Docker Desktop installed and running

### Steps

1. **Check if Docker is running**:
   ```bash
   docker ps
   ```
   If you get an error, start Docker Desktop.

2. **Navigate to the project with docker-compose**:
   ```bash
   cd "Projects/UCID-App/2025-08-uc-app-v1-v1"
   ```

3. **Start PostgreSQL container**:
   ```bash
   docker-compose up -d postgres
   ```

4. **Verify it's running**:
   ```bash
   docker ps | grep postgres
   ```

5. **Connect to PostgreSQL**:
   ```bash
   docker exec -it ucid_postgres psql -U ucid_user -d ucid_app
   ```

6. **Initialize the database schema** (if needed):
   ```bash
   cd backend
   python init_db.py
   ```

### Connection Details (Docker)
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `ucid_app`
- **Username**: `ucid_user`
- **Password**: `ucid_password`
- **Connection String**: `postgresql://ucid_user:ucid_password@localhost:5432/ucid_app`

---

## 💻 Option 2: Local PostgreSQL Installation

### Install PostgreSQL on macOS

1. **Install via Homebrew** (if you have Homebrew):
   ```bash
   brew install postgresql@15
   brew services start postgresql@15
   ```

   Or install PostgreSQL 15 from: https://www.postgresql.org/download/macosx/

2. **Create the database**:
   ```bash
   createdb ucid_app
   ```

3. **Create a user** (optional, or use your default user):
   ```sql
   psql ucid_app
   CREATE USER ucid_user WITH PASSWORD 'ucid_password';
   GRANT ALL PRIVILEGES ON DATABASE ucid_app TO ucid_user;
   ```

4. **Initialize the schema**:
   ```bash
   cd "ucid-app-clean/backend"
   export DB_USER=ucid_user
   export DB_PASSWORD=ucid_password
   export DB_HOST=localhost
   export DB_PORT=5432
   python init_db.py
   ```

---

## 🔍 Check Current Setup

Run these commands to see what you have:

```bash
# Check if Docker is installed
which docker

# Check if Docker is running
docker ps

# Check if PostgreSQL is installed locally
which psql

# Check if PostgreSQL is running (local)
pg_isready 2>/dev/null || echo "PostgreSQL not running locally"

# Check if PostgreSQL container is running (Docker)
docker ps | grep postgres
```

---

## 📝 Environment Variables

After setup, your app will use these environment variables:

```bash
# For Docker setup
DATABASE_URL=postgresql://ucid_user:ucid_password@localhost:5432/ucid_app

# For local setup (if different credentials)
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/ucid_app
```

Set these in your `.env` file or export them:

```bash
export DATABASE_URL=postgresql://ucid_user:ucid_password@localhost:5432/ucid_app
```

---

## 🚀 Quick Start (Docker - Recommended)

If you want to get started quickly with Docker:

```bash
# 1. Navigate to project
cd "Projects/UCID-App/2025-08-uc-app-v1-v1"

# 2. Start PostgreSQL
docker-compose up -d postgres

# 3. Wait a few seconds for it to start, then verify
docker ps | grep postgres

# 4. Connect to test it
docker exec -it ucid_postgres psql -U ucid_user -d ucid_app -c "SELECT version();"
```

If you see a PostgreSQL version, you're all set! ✅

---

## 📚 Useful Commands

### Docker Commands
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Stop PostgreSQL
docker-compose stop postgres

# View logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres

# Remove PostgreSQL container (keeps data)
docker-compose down postgres
```

### PostgreSQL Commands (via Docker)
```bash
# Connect to database
docker exec -it ucid_postgres psql -U ucid_user -d ucid_app

# List all databases
docker exec -it ucid_postgres psql -U ucid_user -l

# List all tables
docker exec -it ucid_postgres psql -U ucid_user -d ucid_app -c "\dt"

# Run a query
docker exec -it ucid_postgres psql -U ucid_user -d ucid_app -c "SELECT * FROM users;"
```

---

## ❓ Which Option Should You Use?

- **Use Docker** if:
  - You want the easiest setup
  - You don't want to install PostgreSQL directly
  - You want to keep things isolated
  - You might use Docker for other services later

- **Use Local Installation** if:
  - You prefer to install PostgreSQL directly
  - You want to use PostgreSQL for other projects
  - You're comfortable with managing PostgreSQL services

---

## 🆘 Troubleshooting

### Docker Issues
- **"Cannot connect to Docker"**: Start Docker Desktop
- **"Port 5432 already in use"**: Another PostgreSQL is running. Stop it or change the port in docker-compose.yml

### Connection Issues
- **"Connection refused"**: PostgreSQL isn't running. Start it with `docker-compose up -d postgres`
- **"Authentication failed"**: Check username/password in docker-compose.yml

---

**Next Steps**: After setting up PostgreSQL, you can run the backend app which will connect to it automatically using the DATABASE_URL environment variable.

