# Notes App - Vite React Setup

This is a Notes App built with React and powered by Vite. Below are the steps to set up and run the application.

## Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v16 or higher recommended) - [Download Node.js](https://nodejs.org/)
- npm (v6 or higher) - npm is included with Node.js

You can verify your installation by running:

```bash
node -v
npm -v
```

# Notes App Setup Guide

## Steps to Set Up and Run the Application

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
Install the required dependencies:

```bash
npm install
```
This will install all the necessary dependencies as specified in the `package.json` file.

### 3. Install Vite React Plugin
Install the Vite plugin for React to enable a smooth development experience:

```bash
npm install @vitejs/plugin-react@^4.3.4
```

### 4. Start the JSON Server
In a new terminal, start the JSON server that will serve mock data for the Notes App. This simulates the backend API for notes app.

```bash
npx json-server --watch db.json --port 5000
```
This will start the mock backend API server on [http://localhost:5000](http://localhost:5000).

### 5. Start the React App
In another terminal, run the following command to start the Vite development server:

```bash
npm run dev
```
This will start the development server and you can open the app at [http://localhost:5173](http://localhost:5173) (the default port for Vite).

### 6. Login Page
When you navigate to the login page of the app, you will be prompted with a login form:

- **Username**: `user`
- **Password**: `password`

> **Note**: For security purposes, you may want to use a more secure password in production. The default credentials can be modified later for production use.

### 7. Making Changes
Once the app is up and running, you can start making changes to the code. The Vite server supports hot module replacement (HMR), so changes to your code will reflect in the app without needing to refresh the page.

### 8. Running Tests
To run the tests with Jest, use the following command:

```bash
npm test
```
This will run the tests defined in your project using Jest. Make sure you have configured your tests properly in the `src` folder.

### 9. Linting
To run ESLint and check your code for style issues, you can use:

```bash
npm run lint
```
This will lint all JavaScript and React files in the project.

### 10. Build for Production
When you're ready to build the project for production, run the following command:

```bash
npm run build
```
This will create a production-ready build in the `dist` folder.

### 11. Preview Production Build
To preview the production build locally, run:

```bash
npm run preview
```

## Additional Notes
I have deployed the app to Netlify: [https://notes-app-dhaval.netlify.app/](https://notes-app-dhaval.netlify.app/)

I haven't configured it for the production environment due to time limitations but would like to do it.

Feel free to customize this README file further to suit your needs. If you have any specific questions or need further assistance, feel free to ask!