# 🔗 BitURL - URL Shortener API

A simple and efficient URL shortener built with **Node.js**, **Express**, and **MongoDB**. This API allows users to shorten long URLs, track usage statistics, and redirect to the original links.

---

## 🚀 Features

- 🔗 Shorten long URLs to custom or auto-generated short codes
- 📥 Redirect to original URL using short code
- 📊 Track total click count per short code
- 🗓️ View analytics like creation date and number of clicks
- 🔐 User authentication using JWT (JSON Web Token)
- 🚫 Rate limiting to prevent abuse (e.g. max 3 requests per 10 mins)
- 📦 RESTful API structure with clear endpoints

---

## 📁 Project Structure



biturl/
├── config/
│ └── db.js
├── controller/
│ ├── uriController.js
│ └── userController.js
├── middleware/
│ ├── authMiddleware.js
│ └── rateLimiter.js
├── model/
│ ├── urlSchema.js
│ └── userSchema.js
├── routes/
│ ├── uriRoute.js
│ └── userRoute.js
├── .env
├── .gitignore
└── index.js



---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **MongoDB** with Mongoose
- **Validator** (for URL validation)
- **bcrypt** (for password hashing)
- **jsonwebtoken** (for token-based authentication)
- **express-rate-limit** (for request limiting)
- **dotenv** (for environment configuration)

---

## 📌 API Endpoints

### 🔐 Auth Routes

#### `POST /user/register`
Registers a new user.

**Body:**
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "yourPassword"
}


🔒 Rate Limiting
Each user/IP is limited to 3 requests per 10 minutes.

Rate limiter is applied globally in the app to prevent abuse (via express-rate-limit).

🔐 Authentication Middleware
All protected routes require a valid JWT token.

Add the token in the Authorization header as:
Bearer <token>

Routes For URL:-

GET /api/getUri
Returns all stored URLs with metadata.

POST /api/shorten 
To post or create an short url requires jwt token

GET /api/:shortCode
Returns creation date and click stats for a specific shortCode requires jwt token.

GET /api/r/:shortCode
Redirects to the original URL and increments the click counter.

Routes For USER:-
POST /user/register
To create or register user

GET /user/Login
For login 

## Create a .env file
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
PORT=5000

