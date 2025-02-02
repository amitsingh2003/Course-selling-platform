# E-Store

E-Store is a MERN stack-based web application where users can browse and access a variety of courses. The platform offers both free and paid courses. While free courses are accessible on the home screen, users need to log in to view and access paid courses. The project includes user authentication to ensure secure access.

## Features

- **Course Catalog**: Displays a list of available courses (free and paid).
- **Free Courses**: Accessible to all users directly from the home screen.
- **Paid Courses**: Requires user authentication to view and access.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Optimized for various devices.

## Technology Stack

E-Store is built using the MERN stack:

- **MongoDB**: For database management.
- **Express.js**: Backend framework for handling API requests.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: Runtime environment for backend development.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community)
- **npm**: Comes with Node.js installation.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/e-store.git
   cd e-store
   ```

2. **Install Dependencies**:
   - Backend dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Frontend dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     PORT=5000
     ```

4. **Start the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
E-Store/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
├── README.md
└── package.json
```

## Commands

### Backend
- Install dependencies: `npm install`
- Start server: `npm start`

### Frontend
- Install dependencies: `npm install`
- Start development server: `npm start`

## Future Enhancements

- Add course search and filtering functionality.
- Integrate payment gateway for seamless paid course access.
- Implement admin dashboard for managing courses.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Demo video


https://github.com/user-attachments/assets/7017b81e-c72c-4577-9590-9b9c5945f6ee



Feel free to explore and contribute to E-Store. Happy coding!

