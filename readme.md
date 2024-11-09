# Gym Registration App Backend
This folder contains the backend code for the gym registration app, built using Node.js, Express.js, and MongoDB.

## Overview
The backend provides RESTful APIs for managing gym classes, user registrations, and authentication. It uses MongoDB as the database to store data.

## Setup
To set up the backend, follow these steps:
1. Install dependencies
Run the following command in the terminal:
```
npm install
```
This will install all the dependencies required by the project.
2. Create a .env file
Create a new file named .env in the root of the project folder. Add the following environment variables:
```
SERVER_PORT=5000
MONGO_URI=mongodb://localhost:27017/gym-registration
JWT_SECRET=your-secret-key
Replace your-secret-key with a secret key of your choice.
```
3. Start the server
Run the following command in the terminal:

```
npm start
```
This will start the server on port 5000.

API Endpoints
The backend provides the following API endpoints:

POST /api/register: Register a new user
POST /api/login: Login an existing user
GET /api/classes: Get all gym classes
POST /api/classes/reserve: Reserve a gym class
POST /api/classes/remove-participant: Remove a participant from a gym class

## Database
The backend uses MongoDB as the database. The database is stored locally on the machine running the server.

## Authentication
The backend uses JSON Web Tokens (JWT) for authentication. When a user logs in, a JWT token is generated and sent back to the client. The client must include this token in the Authorization header of all subsequent requests to authenticate.

## Contributing
If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.