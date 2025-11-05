# Database Migration: MongoDB → PostgreSQL

## Status: ✅ **COMPLETE**

The UCID app has been migrated from MongoDB to PostgreSQL as required by the North Star document.

---

## 📋 Decision Summary

**North Star Requirement** (from `Docs/North-Star/UCID-North-Star.md`):
> **Significant change:** MongoDB → **PostgreSQL** (required)
> - Security and privacy requirements must be adhered to
> - FERPA/GDPR-compliant storage on PostgreSQL

---

## 🎯 Current Implementation

### Active PostgreSQL Setup

**Location**: `ucid-app-clean/backend/`

**Database**: PostgreSQL 14+
- Connection: `psycopg2` library
- Schema: Defined in `Assets/DataSchemas/UCID-Database-Schema.txt`
- Initialization: `ucid-app-clean/backend/init_db.py`

**Key Files**:
- `ucid-app-clean/backend/app.py` - Flask API with PostgreSQL
- `ucid-app-clean/backend/init_db.py` - Database initialization
- `Assets/DataSchemas/UCID-Database-Schema.txt` - Full SQL schema

**Environment Variables**:
```env
DATABASE_URL=postgresql://localhost:5432/ucid_app
SECRET_KEY=your-secret-key
```

---

## 📦 Legacy MongoDB Code

**Location**: `Projects/UCID-App/2025-04-id-career-sorter-v2-v2/backend/`

**Status**: ⚠️ **DEPRECATED** - Do not use for new development

**Note**: This old MongoDB code:
- Contains exposed credentials (now secured with env vars)
- Is kept for reference only
- Should not be used for new features

---

## 🚀 Using PostgreSQL

### Setup

1. **Install PostgreSQL**:
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Create database
   createdb ucid_app
   ```

2. **Initialize Schema**:
   ```bash
   cd ucid-app-clean/backend
   python init_db.py
   ```

3. **Set Environment Variables**:
   ```bash
   export DATABASE_URL=postgresql://localhost:5432/ucid_app
   export SECRET_KEY=your-secret-key
   ```

### Docker Setup

Use the docker-compose file in `Projects/UCID-App/2025-08-uc-app-v1-v1/docker-compose.yml`:

```bash
docker-compose up postgres
```

---

## 📊 Schema Overview

PostgreSQL tables:
- `users` - Student profiles with JSONB for interests/talents
- `ice_breaker_questions` - 100+ conversation starter questions
- `user_responses` - Conversation history
- `career_matches` - AI-generated career recommendations
- `generated_questions` - NLP framework for expanding questions

**Key Features**:
- JSONB columns for flexible data (interests, talents, skills)
- Foreign key relationships
- Indexed for performance
- FERPA-compliant structure

---

## ✅ Migration Checklist

- [x] PostgreSQL schema defined
- [x] Flask backend updated to use PostgreSQL
- [x] Database initialization script created
- [x] Environment variable configuration set up
- [x] Docker configuration updated
- [x] Legacy MongoDB code marked as deprecated
- [x] Documentation updated

---

## 🔗 References

- North Star: `Docs/North-Star/UCID-North-Star.md` (line 98)
- Schema: `Assets/DataSchemas/UCID-Database-Schema.txt`
- Current Backend: `ucid-app-clean/backend/app.py`
- Setup Guide: `ucid-app-clean/README.md`

---

**Last Updated**: Database migration completed. PostgreSQL is the production database.

