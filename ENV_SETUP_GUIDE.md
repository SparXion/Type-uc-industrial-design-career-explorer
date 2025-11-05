# Environment Variables Setup Guide

## 🔒 Security Notice

**CRITICAL**: Credentials were exposed in git history. You MUST rotate all credentials immediately:
1. MongoDB Atlas password
2. AWS access keys
3. XAI API key

After rotating, use the setup below to configure securely.

---

## 📋 Quick Setup

### Step 1: Install python-dotenv

For the backend that uses MongoDB:

```bash
cd "Projects/UCID-App/2025-04-id-career-sorter-v2-v2/backend"
pip install python-dotenv
```

### Step 2: Create .env File

```bash
# Copy the example file
cp .env.example .env

# Edit with your actual credentials (after rotating them!)
# Use your preferred editor
nano .env
# or
code .env
```

### Step 3: Fill in Your Credentials

Edit `.env` with your **NEW** credentials (after rotating):

```env
MONGO_URI=mongodb+srv://username:NEW_PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
AWS_ACCESS_KEY_ID=your_new_aws_key
AWS_SECRET_ACCESS_KEY=your_new_aws_secret
XAI_API_KEY=your_new_xai_key
```

---

## 🔄 Rotating Credentials

### MongoDB Atlas

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to: **Database Access** → Find user `john`
3. Click **Edit** → **Edit Password**
4. Generate a new secure password
5. Update your `.env` file with the new connection string

**New connection string format:**
```
mongodb+srv://john:NEW_PASSWORD@cluster0.mv6muem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### AWS Credentials

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Navigate to: **Users** → Find your user
3. Go to **Security Credentials** tab
4. Find access key: `AKIA3M2YA2DM4GGISSRK`
5. Click **Deactivate** or **Delete**
6. Create new access keys
7. Update your `.env` file

### XAI API Key

1. Go to your XAI dashboard
2. Navigate to API keys section
3. Revoke the exposed key
4. Generate a new API key
5. Update your `.env` file

---

## 🛡️ Verification

After setup, verify your `.env` file is:

✅ **NOT tracked in git** (check `.gitignore`)
✅ **Contains new rotated credentials** (not the old ones)
✅ **Has correct format** (no quotes around values)

Test the configuration:

```bash
cd "Projects/UCID-App/2025-04-id-career-sorter-v2-v2/backend"
python -c "from config import MONGO_URI; print('MongoDB URI loaded:', 'mongodb+srv' in MONGO_URI if MONGO_URI else 'Not set')"
```

---

## 📝 Best Practices

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use `.env.example`** - Template for other developers
3. **Rotate credentials regularly** - Especially if exposed
4. **Use different credentials** - Development vs. production
5. **Store production secrets** - Use secret management (AWS Secrets Manager, etc.)

---

## 🚨 If Credentials Are Still Exposed

The credentials are still in git history. To fully remove them:

1. **Rotate all credentials** (critical - do this first!)
2. Consider using `git filter-branch` or BFG Repo-Cleaner to remove from history
3. Force push to update remote (coordinate with team first)

**Note**: Rewriting git history is disruptive. Rotating credentials is the most important step.

---

## ✅ Checklist

- [ ] Installed `python-dotenv`
- [ ] Created `.env` file from `.env.example`
- [ ] Rotated MongoDB password
- [ ] Rotated AWS access keys
- [ ] Rotated XAI API key
- [ ] Updated `.env` with new credentials
- [ ] Verified `.env` is in `.gitignore`
- [ ] Tested configuration loads correctly

