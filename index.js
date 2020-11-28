const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const userLogin = require('./controller/signin').post;
const userSignUp = require('./controller/signup').post;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.post('/signin', userLogin);
app.post('/signup', userSignUp);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});