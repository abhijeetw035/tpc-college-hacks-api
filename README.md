# TPC College Hacks API

This is a simple RESTful API for managing college life hacks. It allows users to create and retrieve hacks with different categories. Built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB database (local or Atlas)
- Postman (for testing API endpoints)

### Installation

1. Clone the repository:

```bash
https://github.com/rohansen856/tpc-college-hacks-api
cd college-hacks-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB URI:

```
MONGO_URI="mongodb://admin:password@localhost:27017/"
PORT=3000
BEARER_TOKEN="Abherybheysecretthing"
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### Base URL

```
http://localhost:3000
```

---

### GET `/`

Returns a welcome message.

**Request:**

```http
GET /
```

**Response:**

```json
"Welcome to the College Hacks API"
```

---

### GET `/api/hacks`

Retrieve all hacks or filter by category.

**Request:**

```http
GET /api/hacks
```

**Optional Query Parameter:**

- `category`: Filter hacks by category

**Example:**

```http
GET /api/hacks?category=study
```

**Response:**

```json
[
  {
    "_id": "...",
    "title": "...",
    "description": "...",
    "category": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

### POST `/api/hacks`

Create a new hack.

**Request:**

```http
POST /api/hacks
Content-Type: application/json

{
  "title": "...",
  "description": "...",
  "category": "..."
}
```

**Response:**

```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "category": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Postman Collection

You can import this [Postman Collection](#) (replace with actual link) to test the API endpoints easily.

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- dotenv
- Postman (for testing)
