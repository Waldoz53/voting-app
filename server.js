import express from "express"
import sqlite3 from "sqlite3"
import cors from "cors"
import path from "path"

const app = express()
const db = new sqlite3.Database('./voting.db')
const PORT = process.env.PORT || 5001
const __dirname = import.meta.dirname;

app.use(cors())
app.use(express.json())

// Get all categories
app.get('/categories', (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Get nominees by category
app.get('/nominees/:categoryId', (req, res) => {
  const { categoryId } = req.params
  db.all('SELECT * FROM nominees WHERE category_id = ?', [categoryId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Vote for a nominee
app.post('/vote', (req, res) => {
  const { nomineeId } = req.body
  db.run('UPDATE nominees SET votes = votes + 1 WHERE id = ?', [nomineeId], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ success: true })
  })
})

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "dist")));

// Serve React app for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(5001, () => console.log(`Server running on port ${PORT}`))