# LinkedIn Clone

A full-stack social media application inspired by LinkedIn, built with the MERN stack (MongoDB, Express.js, React, Node.js). This project features user authentication, post creation with image uploads, likes, comments, and user profiles.

![LinkedIn Clone](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v20+-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 🚀 Live Demo

- **Frontend**: [https://linkedin-clone-rho-ten.vercel.app/](https://linkedin-clone-rho-ten.vercel.app/)
- **Backend**: [https://linkedin-backend-ui34.onrender.com](https://linkedin-backend-ui34.onrender.com)

## ✨ Features

### Authentication
- 🔐 User signup and login with JWT authentication
- 🔒 Password encryption using bcryptjs
- 🛡️ Protected routes for authenticated users
- 👤 Session persistence with token storage

### Posts
- ✍️ Create posts with text and optional images
- 🖼️ Image upload using ImageKit CDN
- ❤️ Like/unlike posts
- 💬 Add comments to posts
- 🗑️ Delete your own posts
- 📅 Timestamp display (relative time: "2h ago", "3d ago")

### User Profiles
- 👥 View user profiles with their posts
- 📊 Display post count
- 🔗 Navigate between profiles

### UI/UX
- 🎨 Modern, clean interface with Tailwind CSS v4
- 📱 Fully responsive design
- ⚡ Fast page loads with Vite
- 🔄 Real-time updates after actions

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM 7.9.5** - Client-side routing
- **Tailwind CSS 4.1.16** - Styling
- **Vite 7.1.14** - Build tool (using Rolldown)
- **Axios 1.13.2** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.21.2** - Web framework
- **MongoDB** - Database
- **Mongoose 7.8.7** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **ImageKit** - Image CDN
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v20.19.0 or higher)
- MongoDB Atlas account or local MongoDB
- ImageKit account for image uploads

### Clone Repository
```bash
git clone https://github.com/yourusername/linkedin-clone.git
cd linkedin-clone
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

4. Start development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/api/api.js`:
```javascript
const API_URL = "http://localhost:5000/api"; // For local development
```

4. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
linkedin-clone/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── post.model.js
│   │   ├── routes/
│   │   │   ├── user.route.js
│   │   │   └── post.route.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── services/
│   │   │   └── storage.service.js
│   │   ├── db/
│   │   │   └── db.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   ├── AuthContainer.jsx
    │   │   │   ├── LoginForm.jsx
    │   │   │   └── SignupForm.jsx
    │   │   ├── Feed/
    │   │   │   ├── PostForm.jsx
    │   │   │   └── PostCard.jsx
    │   │   ├── Profile/
    │   │   │   ├── ProfileHeader.jsx
    │   │   │   └── ProfilePosts.jsx
    │   │   └── Layout/
    │   │       ├── Navbar.jsx
    │   │       └── Loader.jsx
    │   ├── pages/
    │   │   ├── FeedPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── SignupPage.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── routes/
    │   │   ├── ProtectedRoute.jsx
    │   │   └── PublicRoute.jsx
    │   ├── hooks/
    │   │   └── useAuth.js
    │   ├── api/
    │   │   └── api.js
    │   ├── utils/
    │   │   ├── dateFormatter.js
    │   │   └── constants.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:postId/comment/:commentId` - Delete comment

### Users
- `GET /api/users/:id` - Get user profile with posts

## 🎨 Key Features Implementation

### Authentication Flow
1. User registers/logs in
2. Server generates JWT token
3. Token stored in localStorage
4. Token sent with each authenticated request
5. AuthContext manages user state globally

### Image Upload
1. User selects image via file input
2. FormData sent to backend with multer
3. Backend uploads to ImageKit CDN
4. Image URL saved in MongoDB
5. Image displayed in posts

### Like System
1. Click heart icon on post
2. Check if user already liked
3. Toggle like status in database
4. Update UI with new like count

### Comment System
1. Type comment and submit
2. Add comment with user info to post
3. Refresh post data
4. Display comments with user names

## 🚢 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Update API_URL to production backend
2. Push code to GitHub
3. Connect repository to Vercel
4. Deploy

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📝 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### Frontend
Update `src/api/api.js` and `src/utils/constants.js` with your backend URL.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Your Name**
- GitHub: [@gautam-chudasama](https://github.com/gautam-chudasama)
- LinkedIn: [Gautam Chudasama](https://www.linkedin.com/in/grchudasama-it-lecm-cte/)

## 🙏 Acknowledgments

- Inspired by LinkedIn
- Built as a learning project for MERN stack
- ImageKit for image hosting
- MongoDB Atlas for database hosting

## 📞 Support

For support, email gautam.chudasama@outlook.com or open an issue in the repository.