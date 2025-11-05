# PostgreSQL Access Guide

## ✅ Status: PostgreSQL is Running!

Your PostgreSQL database is now up and running in Docker.

---

## 📊 Connection Information

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `ucid_app`
- **Username**: `ucid_user`
- **Password**: `ucid_password`
- **Connection String**: `postgresql://ucid_user:ucid_password@localhost:5432/ucid_app`

---

## 🔌 How to Access PostgreSQL

### Method 1: Using Docker (Recommended)

```bash
# Connect to PostgreSQL
docker exec -it ucid_postgres psql -U ucid_user -d ucid_app

# Once connected, you can run SQL commands:
# \dt          - List all tables
# \d table_name - Describe a table
# \q           - Quit
```

### Method 2: Using psql (if installed locally)

```bash
psql -h localhost -p 5432 -U ucid_user -d ucid_app
# Password: ucid_password
```

### Method 3: Using Connection String

```bash
psql postgresql://ucid_user:ucid_password@localhost:5432/ucid_app
```

---

## 🛠️ Useful Commands

### Docker Commands

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# View PostgreSQL logs
docker logs ucid_postgres

# Stop PostgreSQL
docker stop ucid_postgres

# Start PostgreSQL
docker start ucid_postgres

# Restart PostgreSQL
docker restart ucid_postgres
```

### SQL Commands (inside psql)

```sql
-- List all databases
\l

-- List all tables
\dt

-- Describe a table structure
\d users

-- List all columns in a table
\d+ users

-- Show current database and user
SELECT current_database(), current_user;

-- Run a query
SELECT * FROM users LIMIT 10;

-- Exit psql
\q
```

---

## 📝 Initialize Database Schema

The database exists but needs tables. To initialize the schema:

### Option 1: Using the init script (if available)

```bash
cd "ucid-app-clean/backend"
export DB_USER=ucid_user
export DB_PASSWORD=ucid_password
export DB_HOST=localhost
export DB_PORT=5432
python init_db.py
```

### Option 2: Using the schema file

```bash
# Connect and run the schema
docker exec -i ucid_postgres psql -U ucid_user -d ucid_app < Assets/DataSchemas/UCID-Database-Schema.txt
```

### Option 3: Manual SQL (if schema file exists)

```bash
docker exec -i ucid_postgres psql -U ucid_user -d ucid_app < path/to/schema.sql
```

---

## 🎯 Quick Test

Test your connection:

```bash
docker exec ucid_postgres psql -U ucid_user -d ucid_app -c "SELECT version();"
```

You should see PostgreSQL version information.

---

## 🔧 Environment Variables for Your App

Set this in your `.env` file or export it:

```bash
export DATABASE_URL=postgresql://ucid_user:ucid_password@localhost:5432/ucid_app
```

Or in your Python code:

```python
import os
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://ucid_user:ucid_password@localhost:5432/ucid_app')
```

---

## 🚨 Troubleshooting

### "Connection refused"
- Make sure PostgreSQL is running: `docker ps | grep postgres`
- Start it: `docker start ucid_postgres` or `docker-compose up -d postgres`

### "Authentication failed"
- Username: `ucid_user`
- Password: `ucid_password`
- Make sure you're using the correct credentials

### "Database does not exist"
- The database `ucid_app` should already exist
- If not, create it: `docker exec -it ucid_postgres psql -U postgres -c "CREATE DATABASE ucid_app;"`

### Port 5432 already in use
- Another PostgreSQL might be running
- Check: `lsof -i :5432`
- Stop the conflicting service or change the port in docker-compose.yml

---

**PostgreSQL is ready to use!** 🎉

