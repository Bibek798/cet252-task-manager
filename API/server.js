const express = require('express');
const app = express();
const db = require('./database');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// test route
app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});


// ===== CRUD ROUTES=====

// get all tasks
/**
 * @api {get} /tasks Get all tasks
 * @apiName GetTasks
 * @apiGroup Tasks
 *
 * @apiSuccess {Object[]} tasks List of tasks
 * @apiSuccess {Number} id Task ID
 * @apiSuccess {String} title Task title
 * @apiSuccess {String} description Task description
 * @apiSuccess {String} status Task status
 * @apiSuccess {String} due_date Task due date
 */
   
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single task
/**
 * @api {get} /tasks/:id Get single task
 * @apiName GetTask
 * @apiGroup Tasks
 *
 * @apiParam {Number} id Task ID
 *
 * @apiSuccess {Number} id Task ID
 * @apiSuccess {String} title Task title
 * @apiSuccess {String} description Task description
 * @apiSuccess {String} status Task status
 * @apiSuccess {String} due_date Task due date
 *
 * @apiError TaskNotFound Task not found
 */
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;

    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(row);
    });
});

// POST task
/**
 * @api {post} /tasks Create a new task
 * @apiName CreateTask
 * @apiGroup Tasks
 *
 * @apiBody {String} title Task title
 * @apiBody {String} description Task description
 * @apiBody {String} status Task status
 * @apiBody {String} due_date Task due date
 *
 * @apiSuccess {Number} id Task ID
 * @apiSuccess {String} message Success message
 *
 * @apiError TitleRequired Title is required
 */
app.post('/tasks', (req, res) => {
    const { title, description, status, due_date } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const sql = `INSERT INTO tasks (title, description, status, due_date)
                 VALUES (?, ?, ?, ?)`;

    db.run(sql, [title, description, status, due_date], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: 'Task created' });
    });
});

// PUT task
/**
 * @api {put} /tasks/:id Update task
 * @apiName UpdateTask
 * @apiGroup Tasks
 *
 * @apiParam {Number} id Task ID
 *
 * @apiBody {String} title Task title
 * @apiBody {String} description Task description
 * @apiBody {String} status Task status
 * @apiBody {String} due_date Task due date
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError TaskNotFound Task not found
 */
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, status, due_date } = req.body;

    const sql = `UPDATE tasks
                 SET title = ?, description = ?, status = ?, due_date = ?
                 WHERE id = ?`;

    db.run(sql, [title, description, status, due_date, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task updated' });
    });
});

// DELETE task
/**
 * @api {delete} /tasks/:id Delete task
 * @apiName DeleteTask
 * @apiGroup Tasks
 *
 * @apiParam {Number} id Task ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError TaskNotFound Task not found
 */
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;

    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    });
});

// TEMPORARY SEED ROUTE
app.get('/seed', (req, res) => {
    const tasks = [
        ['Complete API setup', 'Set up the Express server and confirm it is running correctly', 'completed', '2026-04-03'],
        ['Create database connection', 'Connect the project to the SQLite database', 'completed', '2026-04-04'],
        ['Create tasks table', 'Create the tasks table with suitable fields for the project', 'completed', '2026-04-04'],
        ['Implement GET all tasks', 'Develop endpoint to return all tasks from the database', 'completed', '2026-04-05'],
        ['Implement GET single task', 'Develop endpoint to return one task by ID', 'completed', '2026-04-05'],
        ['Implement POST task', 'Develop endpoint to create a new task', 'completed', '2026-04-05'],
        ['Implement PUT task', 'Develop endpoint to update an existing task', 'pending', '2026-04-06'],
        ['Implement DELETE task', 'Develop endpoint to delete a task from the database', 'pending', '2026-04-06'],
        ['Add input validation', 'Validate required fields before saving task data', 'pending', '2026-04-07'],
        ['Handle API errors', 'Return suitable JSON error messages for invalid requests', 'pending', '2026-04-07'],
        ['Insert realistic sample data', 'Add at least 20 realistic task records to the database', 'pending', '2026-04-07'],
        ['Create low-fidelity wireframes', 'Sketch the main task manager screens for the prototype', 'pending', '2026-04-08'],
        ['Design Figma prototype', 'Create a high-fidelity interactive prototype for the task manager', 'pending', '2026-04-09'],
        ['Build client home page', 'Create the main page to display all tasks', 'pending', '2026-04-10'],
        ['Connect client to API', 'Fetch task data from the GET endpoint and display it in the UI', 'pending', '2026-04-10'],
        ['Style task list UI', 'Apply a clean and consistent visual design to the client interface', 'pending', '2026-04-11'],
        ['Write API documentation', 'Document all endpoints using APIDOC comments', 'pending', '2026-04-11'],
        ['Generate APIDOC site', 'Build the documentation website for the API', 'pending', '2026-04-12'],
        ['Create functional tests', 'Add tests for API and client functionality', 'pending', '2026-04-13'],
        ['Prepare final screencast', 'Record a walkthrough showing API, client, tests, Git, and design', 'pending', '2026-04-14']
    ];

    const stmt = db.prepare('INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)');

    tasks.forEach(task => {
        stmt.run(task);
    });

    stmt.finalize();

    res.json({ message: '20 realistic task records inserted successfully' });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});