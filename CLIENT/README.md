# Task Manager Client

## Overview
This is the client application for the Task Manager system developed for CET252 B2.

The system consists of:
- A REST API built using Node.js and Express
- A SQLite database
- A client application using HTML, CSS, and JavaScript

The client interacts with the API and provides full CRUD functionality (Create, Read, Update, Delete).

---

## Project Structure

cet252/
├── API
├── CLIENT
├── APIDOC

---

## Requirements

Before running the project, ensure you have:

- Node.js installed (recommended version 20 LTS)
- A web browser (Chrome recommended)

---

## How to Run the Project

### Step 1 — Start the API

1. Open terminal
2. Navigate to API folder:

cd API

3. Install dependencies:

npm install

4. Start server:

node server.js

You should see:
Server running on http://localhost:3000

---

### Step 2 — Run the Client

1. Navigate to CLIENT folder:

cd CLIENT

2. Install dependencies:

npm install

3. Open the application:

Open index.html in your browser

---

## How It Works

- The client sends HTTP requests to the API
- The API processes requests and interacts with the SQLite database
- Data is returned in JSON format
- The client displays the data in a structured user interface

---

## Features

- Load tasks from API (GET)
- Add new task (POST)
- Edit existing task (PUT)
- Delete task (DELETE)
- Refresh task list

---

## API Endpoint Used

http://localhost:3000/tasks

---

## Testing

This project uses TestCafe for functional testing.

To run tests:

npx testcafe chrome test.js

### Tests included:

- Load Tasks button works
- Task data is displayed correctly
- Refresh button reloads data
- Add Task button opens form

---

## Notes

- The API must be running before using the client
- node_modules folders are excluded from submission as required
- The project uses Git for version control

---

## Author

Bibek Sharma 