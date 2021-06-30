const express = require('express');

const app = express();

app.use( require('./login'));
app.use( require('./usuario'));
app.use( require('./cuenta'));
app.use( require('./retiro'));


module.exports = app;