'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', (req, res) => {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const responseJSON = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.json(responseJSON);
});
