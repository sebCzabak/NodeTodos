# Todo App

Todo App is a simple task management application that allows users to register, log in, add, edit, delete, and mark tasks as completed.

## Technologies

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React

## Features

- User registration
- User login
- Adding tasks
- Editing tasks
- Deleting tasks
- Marking tasks as completed

## Requirements

- Node.js
- MongoDB

## Running the Application Locally

### Backend

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the server:
    ```sh
    npm start
    ```

The backend will be available at `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the application:
    ```sh
    npm start
    ```

The frontend will be available at `http://localhost:3000`.

### Directory Structure

Ensure that the directory structure looks like this:

my-app/
├── backend/
│ ├── index.js
│ ├── package.json
│ ├── routes/
│ ├── models/
│ └── ... (other backend files)
├── frontend/
│ ├── package.json
│ ├── public/
│ ├── src/
│ └── ... (other frontend files)
└── README.md

## Backend Overview

The backend of this application is built using Node.js and Express. It connects to a MongoDB database to store user and task information.

### File Structure

- `index.js`: The main entry point of the backend application.
- `routes/`: Contains the route definitions for handling API requests.
- `models/`: Contains the Mongoose models for the database schemas.

### Environment Variables

The backend requires the following environment variables:
- `MONGO_URL`: The connection string for the MongoDB database.

## Frontend Overview

The frontend of this application is built using React. It communicates with the backend API to perform CRUD operations on tasks and handle user authentication.

### File Structure

- `src/`: Contains the main source code for the React application.
  - `App.js`: The main component that renders the application.
  - `index.js`: The entry point for the React application.
  - `components/`: Contains the React components used in the application.

## Running the Application

1. **Start MongoDB**: Make sure your MongoDB server is running locally on the default port (27017). You can start it using the following command:
    ```sh
    mongod
    ```

2. **Start the Backend**: Follow the steps in the "Backend" section to start the backend server.

3. **Start the Frontend**: Follow the steps in the "Frontend" section to start the frontend application.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new user account.
3. Log in with your newly created account.
4. Add, edit, delete, and mark tasks as completed using the interface.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.
