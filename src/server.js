require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));

// connect(process.env.LOGIN, process.env.PASS)

// Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Server online' });
});

app.use((req, res) => {
  res.status(404).json({
    msg: 'Not found',
  });
});

console.log('process.env.LOGIN ===', process.env.LOGIN);

app.listen(port, () => console.log(`server is running on port ${port}`.bgYellow.bold));
