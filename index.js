const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const userLogin = require('./controllers/signin').post;
const userSignUp = require('./controllers/signup').post;
const toParentMember = require('./controllers/toParentMember').patch;
const toSitterMember = require('./controllers/toSitterMember').patch;
const getMyInfo = require('./controllers/getMyInfo').get;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.post('/signin', userLogin);
app.post('/signup', userSignUp);
app.patch('/to-parent-member', toParentMember);
app.patch('/to-sitter-member', toSitterMember);
app.get('/get-my-info', getMyInfo);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});