const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const bodyParser = require('body-parser');
const router = require('./routes.js');

app.use(bodyParser.json()); // for axios

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on port ${port}`));
