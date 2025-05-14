# Career_Sync

A Job Portal Web Application connecting companies with job aspirants.

## Features
- User authentication with JWT
- Company registration and approval system
- Job posting by approved companies
- Job aspirant profile creation
- Job type selection and filtering
- Secure CRUD operations
- Express.js backend with MongoDB database
- React frontend with protected routes and role-based access control
- Proper error handling and validation

## 📺 Watch the Demo Video of Career_Sync

[![Watch the video](https://img.youtube.com/vi/kMB9uJOQhzA/maxresdefault.jpg)](https://youtu.be/kMB9uJOQhzA?si=IjOVCLKvAeNMXKpm)

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/) 
- [Git](https://git-scm.com/)


## Installation and Setup

### 1. Clone the Repository
```sh
git clone https://github.com/mihadcse/Career_Sync.git
cd Career_Sync
```

### 2. Setup Backend (Express.js & MongoDB)
```sh
cd Career_Sync_Server
npm install
```

#### Create a `.env` file inside the `Career_Sync_Server` directory and add the following environment variables:
```
PORT=YOUR_PORT
MONGODBURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Run the Career_Sync_Server
```sh
npm start
```
The Career_Sync_Server should now be running.

### 3. Setup Frontend (React). Go to new terminal
```sh
cd Career_Sync_Client
npm install
```

#### Start the Frontend(Career_Sync_Client)
```sh
npm run dev
```
The Career_Sync_Client should now be running.

## To use Admin panel, Create a `.env` file inside the `Career_Sync_Client` directory and add the following environment variables:
```
VITE_ADMIN_EMAIL=your_admin_email
VITE_ADMIN_PASSWORD=your_admin_password

```
-

## Usage
- Companies can register and wait for admin approval.
- Companies can create job posts for different job types.
- Job aspirants can create profiles, select preferable job types.
- Job aspirant can see and apply the approved companies jobs.
- Secure login, registration, and role-based functionalities are implemented.
## Created By
- Syed Huzzatullah Mihad
- CSE-2 ID-210041218
- Zawad Bin Shoukat Tasin
- CSE-2 ID-210041257

