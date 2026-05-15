const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET all coffee
app.get('/coffee', (req, res) => {
  const db = readDB();
  res.json(db.coffee);
});

// GET single coffee
app.get('/coffee/:id', (req, res) => {
  const db = readDB();
  const coffee = db.coffee.find(c => c.id === parseInt(req.params.id));
  if (coffee) res.json(coffee);
  else res.status(404).json({ error: 'Not found' });
});

// GET store info
app.get('/store_info', (req, res) => {
  const db = readDB();
  res.json(db.store_info);
});

// POST new coffee
app.post('/coffee', (req, res) => {
  const db = readDB();
  const newId = db.coffee.length > 0 ? Math.max(...db.coffee.map(c => c.id)) + 1 : 1;
  const newCoffee = { id: newId, ...req.body };
  db.coffee.push(newCoffee);
  writeDB(db);
  res.status(201).json(newCoffee);
});

// PATCH coffee
app.patch('/coffee/:id', (req, res) => {
  const db = readDB();
  const index = db.coffee.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  db.coffee[index] = { ...db.coffee[index], ...req.body };
  writeDB(db);
  res.json(db.coffee[index]);
});

// DELETE coffee
app.delete('/coffee/:id', (req, res) => {
  const db = readDB();
  const index = db.coffee.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  db.coffee.splice(index, 1);
  writeDB(db);
  res.status(204).send();
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});