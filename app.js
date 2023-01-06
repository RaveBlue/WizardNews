const express = require("express");
const morgan = require('morgan');
const postBank = require('./postBank');

const app = express();

app.use(morgan('dev'));

app.get("/", (req, res) => {
  const posts = postBank.list();
}


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

// RaveBlue