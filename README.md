# 🔗 BitURL - URL Shortener API

A simple and efficient URL shortener built with **Node.js**, **Express**, and **MongoDB**. This API allows users to shorten long URLs, track usage statistics, and redirect to the original links.

## 🚀 Features

- Shorten long URLs to custom or auto-generated short codes
- Redirect to original URL using short code
- Track total click count per short code
- View analytics like creation date and number of clicks
- RESTful API structure with clear endpoints

## 📁 Project Structure

biturl/
├── config/
│ └── db.js
├── controller/
│ └── uriController.js
├── model/
│ └── urlSchema.js
├── routes/
│ └── uriRoute.js
├── .env
├── .gitignore
└── index.js 


## 🛠 Tech Stack

- **Node.js**
- **Express**
- **MongoDB** with Mongoose
- **Validator** (for URL validation)
- **dotenv** (for environment config)

## 📌 API Endpoints

### `POST /shorten`
Create a shortened URL.

**Body:**
```json
{
  "originalUrl": "https://example.com",
  "shortCode": "custom123"  // Optional
}


Responses:

201 Created with short URL info

400 Bad Request for invalid input

409 Conflict if shortCode already exists

GET /getUri
Returns all stored URLs with metadata (original URL, shortcode, creation date, and clicks).

GET /:shortCode
Returns creation date and click stats for a specific shortCode.

GET /r/:shortCode
Redirects to the original URL and increments the click counter.


## Create a .env file
env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
