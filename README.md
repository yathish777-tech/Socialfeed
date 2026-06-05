# 🌐 SocialFeed — Full Stack Social Post Application

A production-ready social media feed app built with React + Node.js + MongoDB.

---

## 📁 Project Structure

```
socialfeed/
├── backend/          # Node.js + Express API
└── frontend/         # React + Vite + MUI
```

---

## ⚙️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, Material UI       |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB Atlas (Mongoose ODM)      |
| Auth       | JWT + bcryptjs                    |
| Images     | Multer (disk storage)             |
| Routing    | React Router DOM v6               |

---

## 🚀 Local Setup

### 1. Backend

```bash
cd backend
npm install

# Copy and fill in your values
cp .env.example .env

# Create uploads folder
mkdir uploads

# Start dev server
npm run dev
```

Your backend runs at: `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install

# Copy and fill in your values
cp .env.example .env

# Start dev server
npm run dev
```

Your frontend runs at: `http://localhost:5173`

---

## 🌍 Deployment

### Backend → Render
1. Push `backend/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set environment variables:
   - `MONGO_URI` — MongoDB Atlas connection string
   - `JWT_SECRET` — strong random string
   - `PORT` — `5000`
   - `CLIENT_URL` — your Vercel frontend URL
4. Build: `npm install` | Start: `node server.js`

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Set environment variable:
   - `VITE_API_URL` — your Render backend URL + `/api`
4. Deploy

### Database → MongoDB Atlas
1. Create free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a DB user with read/write access
3. Whitelist all IPs (`0.0.0.0/0`) for Render compatibility
4. Copy the connection string to `MONGO_URI`

---

## 📡 API Endpoints

| Method | Endpoint                  | Auth | Description          |
|--------|---------------------------|------|----------------------|
| POST   | /api/auth/register        | No   | Register user        |
| POST   | /api/auth/login           | No   | Login user           |
| GET    | /api/posts                | No   | Get all posts        |
| POST   | /api/posts                | Yes  | Create post          |
| GET    | /api/posts/:id            | No   | Get single post      |
| PUT    | /api/posts/:id/like       | Yes  | Toggle like          |
| POST   | /api/posts/:id/comment    | Yes  | Add comment          |
| DELETE | /api/posts/:id            | Yes  | Delete post (owner)  |

---

## ✅ Features

- 🔐 JWT Authentication (register / login)
- 📝 Create posts with text, image, or both
- ❤️ Like / Unlike toggle (no double likes)
- 💬 Comment on posts (real-time update)
- 🗑️ Delete your own posts
- 🖼️ Image upload with preview (Multer)
- 💀 Skeleton loading cards
- 📱 Fully responsive (MUI)
- 🔒 Protected routes
- 🌐 Deployment ready (Vercel + Render + Atlas)

---

## 🔑 Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```
