# Credential Rotation Guide - Step by Step

This guide will walk you through rotating all three exposed credentials.

---

## 🔐 Credential 1: MongoDB Atlas Password

### Exposed Credential
- **User**: `john`
- **Password**: `[REDACTED - See your MongoDB Atlas dashboard]`
- **Cluster**: `cluster0.mv6muem.mongodb.net`

### Steps to Rotate

1. **Sign in to MongoDB Atlas**
   - Go to: https://cloud.mongodb.com/
   - Sign in with your MongoDB Atlas account

2. **Navigate to Database Access**
   - In the left sidebar, click **"Security"**
   - Click **"Database Access"**

3. **Find the User**
   - Look for user `john` in the list
   - Click the **"Edit"** button (pencil icon) next to the user

4. **Change the Password**
   - Click **"Edit Password"** button
   - Choose **"Autogenerate Secure Password"** OR enter a new strong password manually
   - **IMPORTANT**: Copy the new password immediately (you won't see it again!)
   - Click **"Update User"**

5. **Update Your Connection String**
   - The new connection string format will be:
     ```
     mongodb+srv://john:YOUR_NEW_PASSWORD@cluster0.mv6muem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Replace `YOUR_NEW_PASSWORD` with the password you just created

6. **Update Your .env File** (if you have one)
   ```bash
   cd "Projects/UCID-App/2025-04-id-career-sorter-v2-v2/backend"
   nano .env
   # Update MONGO_URI with new password
   ```

7. **Verify the Old Password No Longer Works**
   - Try connecting with the old password - it should fail
   - This confirms the rotation was successful

---

## 🔐 Credential 2: AWS Access Keys

### Exposed Credentials
- **Access Key ID**: `[REDACTED - Check AWS IAM console]`
- **Secret Access Key**: `[REDACTED - Check AWS IAM console]`

### Steps to Rotate

1. **Sign in to AWS Console**
   - Go to: https://console.aws.amazon.com/
   - Sign in with your AWS account

2. **Navigate to IAM**
   - In the search bar at the top, type **"IAM"**
   - Click **"IAM"** from the results

3. **Find Your User**
   - In the left sidebar, click **"Users"**
   - Click on your username (the user that owns the exposed access key)

4. **View Security Credentials**
   - Click the **"Security credentials"** tab
   - Scroll down to **"Access keys"** section

5. **Deactivate the Old Access Key**
   - Find the access key that was exposed (check your email/notifications for the exact key ID)
   - Click the **"Actions"** dropdown (three dots) next to it
   - Click **"Deactivate"**
   - Confirm the deactivation

6. **Delete the Old Access Key** (Optional but Recommended)
   - After deactivating, click **"Actions"** again
   - Click **"Delete"**
   - Type "delete" to confirm
   - Click **"Delete"**

7. **Create New Access Keys**
   - Still in the **"Access keys"** section, click **"Create access key"**
   - Choose **"Application running outside AWS"** or **"Command Line Interface (CLI)"**
   - Click **"Next"**
   - (Optional) Add a description tag like "UCID App - New Keys"
   - Click **"Create access key"**

8. **Save the New Credentials**
   - **CRITICAL**: Copy both the **Access Key ID** and **Secret Access Key** immediately
   - You can click **"Download .csv file"** to save them securely
   - You won't be able to see the secret key again after closing this window!

9. **Update Your .env File**
   ```bash
   cd "Projects/UCID-App/2025-04-id-career-sorter-v2-v2/backend"
   nano .env
   # Update:
   AWS_ACCESS_KEY_ID=your_new_access_key_id
   AWS_SECRET_ACCESS_KEY=your_new_secret_access_key
   ```

10. **Verify the Old Keys No Longer Work**
    - Try using the old keys in an AWS CLI command - it should fail
    - This confirms the rotation was successful

---

## 🔐 Credential 3: XAI API Key

### Exposed Credential
- **API Key**: `[REDACTED - Check XAI console for exposed key]`

### Steps to Rotate

1. **Sign in to XAI Console**
   - Go to: https://console.x.ai/ (or your XAI dashboard URL)
   - Sign in with your XAI account

2. **Navigate to API Keys**
   - Look for **"API Keys"**, **"Settings"**, or **"Developer"** section
   - Click on **"API Keys"** or **"API Management"**

3. **Find the Exposed Key**
   - Look for the key that was exposed (check your email/notifications for details)
   - Or look for keys created around the time you originally set up the app
   - The exposed key will match the one mentioned in GitHub's security alert

4. **Revoke the Old Key**
   - Click the **"Delete"**, **"Revoke"**, or **"Remove"** button next to the key
   - Confirm the deletion/revocation

5. **Create a New API Key**
   - Click **"Create API Key"** or **"Generate New Key"** button
   - (Optional) Give it a name like "UCID App - New Key"
   - Click **"Create"** or **"Generate"**

6. **Save the New Key**
   - **CRITICAL**: Copy the new API key immediately
   - It will typically start with `xai-` followed by a long string
   - You won't be able to see it again after closing this window!

7. **Update Your .env File**
   ```bash
   cd "Projects/UCID-App/2025-04-id-career-sorter-v2-v2/backend"
   nano .env
   # Update:
   XAI_API_KEY=your_new_xai_api_key
   ```

8. **Verify the Old Key No Longer Works**
   - Try making an API call with the old key - it should return an authentication error
   - This confirms the rotation was successful

---

## ✅ Verification Checklist

After rotating all credentials, verify:

- [ ] MongoDB: Old password no longer works
- [ ] MongoDB: New password works in connection string
- [ ] AWS: Old access key is deactivated/deleted
- [ ] AWS: New access keys work for API calls
- [ ] XAI: Old API key is revoked
- [ ] XAI: New API key works for API calls
- [ ] All new credentials are saved in `.env` file (not committed to git)
- [ ] `.env` file is in `.gitignore` (verified)

---

## 📝 After Rotation

1. **Update GitHub Secret Alerts**
   - GitHub may take 24-48 hours to re-scan and clear the alert
   - The alert may persist even after rotation (this is normal)
   - The important thing is the credentials are now invalid

2. **Test Your Application**
   - Make sure your app still works with the new credentials
   - Test all features that use these services

3. **Document the Changes**
   - Note down when you rotated each credential
   - Keep the new credentials secure (use a password manager)

---

## 🚨 Important Notes

- **Never commit credentials to git** - Always use environment variables
- **Use a password manager** to store new credentials securely
- **Rotate credentials regularly** - Consider doing this every 90 days
- **Monitor for unauthorized access** - Check logs for any suspicious activity
- **If you suspect compromise** - Rotate immediately and review access logs

---

## 💡 Need Help?

If you encounter any issues during rotation:

1. **MongoDB**: Check MongoDB Atlas documentation or contact their support
2. **AWS**: Check AWS IAM documentation or AWS Support
3. **XAI**: Check XAI API documentation or contact their support

---

**Last Updated**: Credential rotation guide created
**Status**: Ready for rotation

