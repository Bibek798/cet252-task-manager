# Task Manager Client

## Overview
This is the client application for the Task Manager prototype system developed using HTML, CSS, and JavaScript.
The client connects to a REST API built with Node.js and Express, and retrieves task data from a SQLite database.

## Features
- Fetch and display tasks from the API
- Clean and simple user interface (high-fidelity presentation)
- Load and refresh task data
- Functional testing using TestCafe

## Requirements
Before running the client, ensure:
- Node.js is installed
- The API server is running at: http://localhost:3000

## How to Run the Client
1. Navigate to the CLIENT folder:
   cd CLIENT

2. Install dependencies:
   npm install

3. Run the application:
   Open index.html in your web browser

## How It Works
- Click the "Load Tasks" button to send a GET request to the API
- The client fetches data from: http://localhost:3000/tasks
- The returned JSON data is displayed in a structured and styled format
- Click the "Refresh" button to reload the data

## Testing
This project includes functional tests using TestCafe.

Run tests using:
npx testcafe chrome test.js

The tests:
- Verify the Load Tasks button works correctly
- Check that task data is displayed
- Ensure the Refresh button reloads data

## Notes
- The client demonstrates interaction with the API using a GET request as required by the assignment
- Full CRUD functionality is implemented in the API and represented in the Figma prototype

## Author
Bibek Sharma 