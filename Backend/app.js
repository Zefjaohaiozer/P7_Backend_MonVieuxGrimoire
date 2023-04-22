const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const path = require('path');
const app = express();
const userRoutes = require('./routes/users');
const bookRoute = require('./routes/books');
require('dotenv').config();
const MongoLogin = process.env.MONGOID;
const MongoPwd = process.env.MONGOPWD;
module.exports = app;

app.use(cors());

app.use((req, res, next) => {
  mongoose
    .connect(
      `mongodb+srv://${MongoLogin}:${MongoPwd}@cluster0.3dfkmq8.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
  next();
});
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Max-Age', '86400');
  next();
});

app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoute);
