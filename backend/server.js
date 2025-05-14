const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dbConfig = require('./config/db.config.js');

const app = express();

app.use(cors());
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Connect to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  
  // Create notes table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS notes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  connection.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log("Notes table created/verified successfully");
  });
});

// Routes
// Get all notes
app.get('/api/notes', (req, res) => {
  connection.query('SELECT * FROM notes ORDER BY created_at DESC', (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching notes", error: err });
      return;
    }
    res.json(results);
  });
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }
  
  connection.query(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error creating note", error: err });
        return;
      }
      res.status(201).json({ id: results.insertId, title, content });
    }
  );
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;
  
  connection.query(
    'UPDATE notes SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    (err) => {
      if (err) {
        res.status(500).json({ message: "Error updating note", error: err });
        return;
      }
      res.json({ message: "Note updated successfully" });
    }
  );
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  
  connection.query('DELETE FROM notes WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ message: "Error deleting note", error: err });
      return;
    }
    res.json({ message: "Note deleted successfully" });
  });
});

app.get('/check', (req, res) => "yon-naz note app is live");


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 