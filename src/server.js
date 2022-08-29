require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
// ijungiam gaunamus duomenis json formatu
app.use(express.json());

// connect(process.env.LOGIN, process.env.PASS)

// Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Server online' });
});

app.get('/api/posts/', async (req, res) => {
  try {
    // 1. prisijungti prie db
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conected to DB'.bgGreen.bold);
    // 2. atlikti veiksma
    const sql = 'SELECT * FROM posts';
    const [rows] = await connection.query(sql);
    console.log('rows ===', rows);
    res.json(rows);
    // 3.uzdaryti prisijungima
    connection.end();
  } catch (error) {
    console.log('Error Conecting to DB'.bgRed.bold, error);
    // 4. gaudyti klaidas
    res.status(500).json({ msg: 'something went worng' });
  }
});

// POST /api/posts/ - paduoti author, body, category
app.post('/api/posts/', async (req, res) => {
  // where is author???
  console.log('req.body ===', req.body);
  const { author, body, category } = req.body;
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO posts ( author, body, category) VALUES (?, ?, ?)';
    const [rows] = await conn.execute(sql, [author, body, category]);
    if (rows.affectedRows === 1) {
      res.status(201).json({ msg: 'Post created' });
    } else {
      throw new Error('no rows affected');
    }
  } catch (error) {
    console.log('Error Conecting to DB'.bgRed.bold, error);
    // 4. gaudyti klaidas
    res.status(500).json({ msg: 'something went worng' });
  }
});

// single post route
app.get('/api/posts/:pid', async (req, res) => {
  // res.send('get single post');
  const id = +req.params.pid;
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts WHERE id = ?';
    // execute daro su prepared statments ir apsaugo nuo sql injection
    const [rows] = await conn.execute(sql, [id]);
    if (rows.length === 1) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ msg: 'Post not found' });
    }
    // uzdarom prisijungima
    conn.end();
  } catch (error) {
    console.log('Error Conecting to DB'.bgRed.bold, error);
    // 4. gaudyti klaidas
    res.status(500).json({ msg: 'something went worng' });
  }
});

// GET /api/posts/category/movies - movies dalis dinamine, grazinam tik toje kagegorijoje esancius postus

// GET /api/posts/order/desc - gauti postus isrikiuotus pagas varda
// const sql = 'SELECT * FROM posts ORDER BY author DESC';
app.get('/api/posts/order/:orderDirection/', async (req, res) => {
  const order = req.params.orderDirection === 'desc' ? 'DESC' : 'ASC';
  // const order = req.params.orderDirection;
  console.log('order ===', order);
  try {
    // 1. prisijungti prie db
    const connection = await mysql.createConnection(dbConfig);
    // console.log('Conected to DB'.bgGreen.bold);
    // 2. atlikti veiksma
    const sql = `SELECT * FROM posts ORDER BY author ${order}`;
    const [rows] = await connection.query(sql);
    res.json(rows);
    // 3.uzdaryti prisijungima
    connection.end();
  } catch (error) {
    console.log('Error Conecting to DB'.bgRed.bold, error);
    // 4. gaudyti klaidas
    res.status(500).json({ msg: 'something went worng' });
  }
});

// GET /api/posts/order/desc - desc dalis butu dinamine galimos reiksmes asc|desc
app.use((req, res) => {
  res.status(404).json({
    msg: 'Not found',
  });
});

app.listen(port, () => console.log(`server is running on port ${port}`.bgYellow.bold));

// prisidedam public direktorija
// indexe forma su author body ir category
// surenkam inputus ir kuriam nauja posta
