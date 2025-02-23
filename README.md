# 🚀 Web Application Firewall (WAF) using JavaScript

A Web Application Firewall (WAF) built using JavaScript (Node.js + Express) with a frontend dashboard (React.js). The WAF helps protect web applications from malicious attacks like SQL Injection, XSS, and unauthorized access.

## Features
✅ Blocks malicious requests (SQL Injection, XSS, CSRF)  
✅ Logs blocked requests into a database  
✅ Provides an admin panel to monitor and manage firewall rules  
✅ Built with Node.js, Express.js, MongoDB, and React.js  

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Render / Vercel / Heroku (Free Tier)

## Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB (local or cloud instance)
- Git installed

### Clone the Repository
```sh
git clone https://github.com/Chetna-Jha-QC/WAFusingJS.git
cd waf-project
```

### Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### Environment Variables
Create a `.env` file in the `backend` directory and configure the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/waf-db
JWT_SECRET=your-secret-key
```

### Run the Application
#### Start Backend Server
```sh
cd backend
npm start
```
#### Start Frontend
```sh
cd frontend
npm start
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/logs` | Get blocked request logs |
| POST | `/api/rules` | Add new firewall rule |
| DELETE | `/api/rules/:id` | Remove a firewall rule |

## License
This project is licensed under the MIT License.