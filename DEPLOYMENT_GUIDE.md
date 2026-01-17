# 🚀 Complete Deployment Guide - Bhagwa Hindu App

## 📋 Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Mobile App Build](#mobile-app-build)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)

---

## 🔧 Backend Deployment

### Option 1: Render.com (Recommended - Free Tier)

1. **Create Account**: https://render.com

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select `bhagwa-hindu-app`

3. **Configuration**:
   ```
   Name: bhagwa-hindu-backend
   Environment: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   ```

4. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhagwa_hindu_app
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-url.vercel.app
   DAILY_LOGIN_COINS=10
   STORY_SUBMIT_COINS=50
   TASK_COMPLETE_COINS=100
   ```

5. **Deploy**: Click "Create Web Service"

**Live URL**: `https://bhagwa-hindu-backend.onrender.com`

---

### Option 2: Railway.app

1. Visit https://railway.app
2. New Project → Deploy from GitHub
3. Select `bhagwa-hindu-app` repository
4. Add MongoDB database from templates
5. Set environment variables (same as above)
6. Deploy automatically

---

### Option 3: Heroku

```bash
cd backend
heroku login
heroku create bhagwa-hindu-backend

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set FRONTEND_URL=your_frontend_url

# Deploy
git subtree push --prefix backend heroku main

# Or
cd backend
git init
heroku git:remote -a bhagwa-hindu-backend
git add .
git commit -m "Deploy backend"
git push heroku main
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Method 1: CLI
```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

#### Method 2: GitHub Integration
1. Visit https://vercel.com
2. Import Git Repository
3. Select `bhagwa-hindu-app`
4. Configure:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```
5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
6. Deploy

**Live URL**: `https://bhagwa-hindu-app.vercel.app`

---

### Option 2: Netlify

#### Method 1: Drag & Drop
```bash
cd frontend
npm run build
# Drag & drop 'build' folder to https://app.netlify.com/drop
```

#### Method 2: CLI
```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

#### Method 3: GitHub Integration
1. Visit https://app.netlify.com
2. New site from Git
3. Select repository
4. Configure:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/build
   ```
5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

---

## 📱 Mobile App Build (Android/iOS)

### Prerequisites
- Node.js 18+
- Android Studio (for Android)
- Xcode (for iOS, Mac only)

### Setup Capacitor

```bash
cd frontend

# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios

# Initialize Capacitor
npx cap init
# App name: Bhagwa Hindu
# Package ID: com.bhagwa.hindu

# Add platforms
npx cap add android
npx cap add ios
```

### Build for Android

```bash
# Build React app
npm run build

# Sync with Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android

# In Android Studio:
# 1. Build → Generate Signed Bundle / APK
# 2. Select APK
# 3. Create new keystore or use existing
# 4. Build Release APK
```

**APK Location**: `android/app/build/outputs/apk/release/app-release.apk`

### Build for iOS

```bash
# Build React app
npm run build

# Sync with Capacitor
npx cap sync ios

# Open in Xcode
npx cap open ios

# In Xcode:
# 1. Select target device
# 2. Product → Archive
# 3. Distribute App → App Store Connect
```

### Upload to Play Store

1. Create Google Play Console account
2. Create new app
3. Upload APK/AAB
4. Fill app details, screenshots
5. Submit for review

### Upload to App Store

1. Create Apple Developer account
2. Create app in App Store Connect
3. Upload via Xcode
4. Fill app details, screenshots
5. Submit for review

---

## 🗄️ Database Setup

### MongoDB Atlas (Free Tier)

1. **Create Account**: https://www.mongodb.com/cloud/atlas

2. **Create Cluster**:
   - Choose FREE tier (M0)
   - Select region closest to your users
   - Cluster name: `bhagwa-hindu-cluster`

3. **Create Database User**:
   - Database Access → Add New User
   - Username: `bhagwa_admin`
   - Password: Generate secure password
   - Role: Read and write to any database

4. **Whitelist IP**:
   - Network Access → Add IP Address
   - Allow Access from Anywhere: `0.0.0.0/0`
   - (For production, use specific IPs)

5. **Get Connection String**:
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `bhagwa_hindu_app`

**Connection String**:
```
mongodb+srv://bhagwa_admin:<password>@bhagwa-hindu-cluster.xxxxx.mongodb.net/bhagwa_hindu_app?retryWrites=true&w=majority
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhagwa_hindu_app

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=https://bhagwa-hindu-app.vercel.app

# Coin Rewards
DAILY_LOGIN_COINS=10
STORY_SUBMIT_COINS=50
TASK_COMPLETE_COINS=100
SHARE_COINS=20

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)

```env
REACT_APP_API_URL=https://bhagwa-hindu-backend.onrender.com/api
```

---

## ✅ Deployment Checklist

### Backend
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Environment variables set
- [ ] Backend deployed to Render/Railway/Heroku
- [ ] API endpoints tested
- [ ] CORS configured for frontend URL

### Frontend
- [ ] API URL updated in .env
- [ ] Build tested locally (`npm run build`)
- [ ] Deployed to Vercel/Netlify
- [ ] Environment variables set
- [ ] Routes working correctly
- [ ] API calls successful

### Mobile App
- [ ] Capacitor configured
- [ ] Android build successful
- [ ] iOS build successful (if applicable)
- [ ] App icons added
- [ ] Splash screen configured
- [ ] APK/IPA generated
- [ ] Uploaded to Play Store/App Store

---

## 🧪 Testing Deployment

### Backend API Test
```bash
# Health check
curl https://your-backend-url.onrender.com/health

# Register user
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Frontend Test
1. Open https://your-frontend-url.vercel.app
2. Register new account
3. Login
4. Check all features working
5. Test on mobile devices

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check connection string format
- Verify database user credentials
- Ensure IP is whitelisted

**CORS Errors**
- Add frontend URL to FRONTEND_URL env variable
- Check CORS configuration in server.js

**Port Issues**
- Ensure PORT environment variable is set
- Use `process.env.PORT || 5000`

### Frontend Issues

**API Calls Failing**
- Verify REACT_APP_API_URL is correct
- Check backend is running
- Inspect network tab in browser

**Build Errors**
- Clear node_modules and reinstall
- Check for missing dependencies
- Verify Node version (18+)

### Mobile App Issues

**Build Failed**
- Update Android Studio/Xcode
- Check Capacitor version compatibility
- Sync project: `npx cap sync`

**App Crashes**
- Check console logs
- Verify API URL is correct
- Test on different devices

---

## 📞 Support

For deployment issues:
- Check logs in hosting platform
- Review error messages
- Test locally first
- Contact: rm2778643@gmail.com

---

**🕉️ जय श्री राम! Happy Deploying! 🚀**
