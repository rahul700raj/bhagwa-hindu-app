# 🕉️ Bhagwa Hindu App

A complete full-stack MERN application for Hindu spiritual content, stories, tasks, and community engagement with a gamified coin system.

## ✨ Features

### 🎯 Core Features
- **📖 Hindu Stories** - Share and read stories from Ramayana, Mahabharata, Puranas, and more
- **✅ Daily Tasks** - Complete spiritual tasks and earn coins
- **🪙 Coin System** - Gamified reward system for engagement
- **📚 Hindu Content** - Mantras, Shlokas, Aartis, Chalisas, Bhajans
- **🏆 Leaderboard** - Compete with other users
- **👤 User Profiles** - Track progress, level, and achievements
- **🎖️ Badges & Levels** - Unlock achievements as you progress

### 🎨 Design Features
- **🧡 Bhagwa Theme** - Beautiful saffron/orange color scheme
- **✨ Smooth Animations** - Framer Motion animations throughout
- **📱 Fully Responsive** - Works on all devices
- **🌐 Hindi Support** - Devanagari script support
- **🎭 Modern UI** - Tailwind CSS with custom components

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Mongoose** - ODM

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Navigation
- **React Icons** - Icon library

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git installed

### 1. Clone Repository
```bash
git clone https://github.com/rahul700raj/bhagwa-hindu-app.git
cd bhagwa-hindu-app
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/bhagwa_hindu_app
# JWT_SECRET=your_secret_key
# PORT=5000

# Start backend
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm start
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🚀 Deployment

### Deploy Backend (Render/Railway/Heroku)

#### Render.com
1. Create account on https://render.com
2. New Web Service → Connect GitHub repo
3. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret
   FRONTEND_URL=your_frontend_url
   ```

#### Railway.app
1. Visit https://railway.app
2. New Project → Deploy from GitHub
3. Select `bhagwa-hindu-app` repo
4. Add MongoDB database
5. Set environment variables

### Deploy Frontend (Vercel/Netlify)

#### Vercel
```bash
cd frontend
npm install -g vercel
vercel
```

Or connect GitHub repo on https://vercel.com

#### Netlify
```bash
cd frontend
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Or drag & drop `build` folder on https://netlify.com

### Environment Variables for Production

**Backend (.env)**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhagwa_hindu_app
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
DAILY_LOGIN_COINS=10
STORY_SUBMIT_COINS=50
TASK_COMPLETE_COINS=100
```

**Frontend (.env)**
```
REACT_APP_API_URL=https://your-backend-url.render.com/api
```

## 📱 Mobile App (Android/iOS)

### Using Capacitor

```bash
cd frontend
npm install @capacitor/core @capacitor/cli
npx cap init

# Add platforms
npx cap add android
npx cap add ios

# Build and sync
npm run build
npx cap sync

# Open in Android Studio / Xcode
npx cap open android
npx cap open ios
```

### Build APK
```bash
cd android
./gradlew assembleRelease
# APK location: android/app/build/outputs/apk/release/app-release.apk
```

## 📖 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update profile
- `GET /api/users/leaderboard` - Get leaderboard

### Stories
- `GET /api/stories` - Get all stories
- `GET /api/stories/:id` - Get single story
- `POST /api/stories` - Create story (auth required)
- `POST /api/stories/:id/like` - Like story
- `POST /api/stories/:id/comment` - Add comment

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks/:id/complete` - Complete task (auth required)

### Content
- `GET /api/content` - Get Hindu content (mantras, shlokas, etc.)
- `GET /api/content/:id` - Get single content
- `POST /api/content/:id/like` - Like content

### Coins
- `GET /api/coins/balance` - Get coin balance
- `POST /api/coins/daily-login` - Claim daily login reward

## 🎮 Coin System

### Earning Coins
- **Daily Login**: 10 coins
- **Story Submission (Approved)**: 50 coins
- **Task Completion**: 10-100 coins (based on difficulty)
- **Sharing Content**: 20 coins

### Levels
- Level 1: 0-999 XP
- Level 2: 1000-1999 XP
- Level 3: 2000-2999 XP
- And so on...

## 🎨 Color Scheme

```css
Bhagwa (Saffron): #FF6F00
Light Bhagwa: #FFF5F0
Dark Bhagwa: #993f00
Om Gold: #FFD54F
Background: Linear gradient from #FFF5F0 to #FFE6D9
```

## 📂 Project Structure

```
bhagwa-hindu-app/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Zustand stores
│   │   ├── utils/       # Utilities
│   │   ├── App.js       # Main App component
│   │   └── index.css    # Global styles
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

**Rahul Mishra**
- GitHub: [@rahul700raj](https://github.com/rahul700raj)
- Email: rm2778643@gmail.com

## 🙏 Acknowledgments

- Hindu scriptures and teachings
- Open source community
- All contributors

---

**जय श्री राम! 🙏 हर हर महादेव! 🕉️**

Made with ❤️ for Hindu community
