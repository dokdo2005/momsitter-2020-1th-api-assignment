const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const userLogin = require('./controllers/signin').post;
const userSignUp = require('./controllers/signup');
const toParentMember = require('./controllers/toParentMember').patch;
const toSitterMember = require('./controllers/toSitterMember').patch;
const getMyInfo = require('./controllers/getMyInfo').get;
const updateMyInfo = require('./controllers/updateMyInfo').put;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.post('/signin', userLogin);
app.post('/sitter-signup', userSignUp.sitter);
app.post('/parent-signup', userSignUp.parent);
app.patch('/to-parent-member', toParentMember);
app.patch('/to-sitter-member', toSitterMember);
app.get('/get-my-info', getMyInfo);
app.put('/update-my-info', updateMyInfo);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});