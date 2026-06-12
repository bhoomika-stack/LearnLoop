# LearnLoop

A full-stack skill-sharing platform where users can teach skills, learn from others, and manage their personal learning profile.

## Features

* User Registration and Login
* Secure Password Hashing using bcrypt
* Session-Based Authentication
* Protected Routes
* User Profile Management
* Add Skills
* Browse Skills
* Edit Skills
* Delete Skills
* User-Specific Skill Ownership
* MongoDB Atlas Database Integration
* Responsive User Interface

## Tech Stack

### Frontend

* HTML
* CSS
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication & Security

* bcrypt
* express-session
* dotenv

## Project Structure


LearnLoop/
│
├── app.js
├── package.json
├── models/
│   ├── users.js
│   └── skills.js
│
├── views/
├── public/
│
└── README.md


## Installation

1. Clone the repository


git clone https://github.com/bhoomika-stack/LearnLoop.git


2. Install dependencies


npm install


3. Create a .env file


MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key


4. Run the application


node app.js


## Future Improvements

- Learning Goals Management
- Mentor Discovery and Matching
- Search and Filter Skills
- User Profile Pictures
- Skill Request System
- Community Messaging
- Personalized Skill Recommendations

## Author

**Bhumika Bajpai**

B.Tech Cyber Security Student | Full Stack Developer

GitHub: https://github.com/bhoomika-stack
