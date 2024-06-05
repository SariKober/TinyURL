const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const linkRoutes = require('./routes/links');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/links', linkRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
