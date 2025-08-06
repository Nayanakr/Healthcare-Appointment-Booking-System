Nayana Hospital MERN Stack Project

  Overview

Nayana Hospital Management System is a web-based application designed to streamline hospital operations such as appointment scheduling, user management, and secure access for patients, doctors, and administrators. The project uses the MERN stack (MongoDB, Express.js, React.js, Node.js) for a modern, scalable, and maintainable solution.

  Features

- User registration and login (patients, doctors, admin)
- Appointment scheduling and management
- Doctor directory
- Admin dashboard for system management
- Secure authentication and authorization (JWT)
- Responsive and user-friendly UI

  Technology Stack

   Backend

-    Node.js   : JavaScript runtime
-    Express.js   : Web framework for RESTful APIs
-    MongoDB   : NoSQL database
-    Mongoose   : ODM for MongoDB
-    dotenv   : Environment variable management
-    cors   : Cross-Origin Resource Sharing
-    jsonwebtoken   : JWT authentication
-    bcryptjs   : Password hashing

   Frontend

-    React.js   : UI library (not included in this repository)
-    Tailwind CSS   : Utility-first CSS framework
-    Vite   : Frontend build tool

  Getting Started

   Prerequisites

- Node.js (v16 or above)
- npm (Node package manager)
- MongoDB Atlas account or local MongoDB instance

   Backend Setup

1.    Clone the repository   

   bash
   git clone <repository-url>
   cd nayana-hospital/Server
   

2.    Install dependencies   

   bash
   npm install
   

3.    Configure environment variables   

   - Create a .env file in the Server directory.
   - Add the following:
     
     MONGODB_URI=<your-mongodb-connection-string>
     PORT=5000
     

4.    Run the server   
   bash
   node Server.js
   
   The server will start on http://localhost:5000.

   Frontend Setup

>    Note:    The frontend code is not included in this repository.  
> Typical steps:
>
> 1. Clone the frontend repository.
> 2. Install dependencies (npm install).
> 3. Run the development server (npm run dev).

  API Endpoints

- GET /api/users - List users
- POST /api/users/register - Register user
- POST /api/users/login - Login user
- GET /api/appointments - List appointments
- POST /api/appointments - Create appointment
- ...and more

  Packages Used

- express
- mongoose
- dotenv
- cors
- jsonwebtoken
- bcryptjs


  Author

Nayana Hospital Project Team
