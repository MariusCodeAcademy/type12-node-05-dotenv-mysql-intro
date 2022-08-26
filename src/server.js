const express = require('express');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Server online' });
});

app.use((req, res) => {
  res.status(404).json({
    msg: 'Not found',
  });
});

app.listen(port, () => console.log(`server is running on port ${port}`.bgYellow.bold));
