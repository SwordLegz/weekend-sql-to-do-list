const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;
const todos = require('./routes/todos.router.js');

// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(express.static('./server/public'));
app.use(express.json());

// ROUTES
app.use('/todos', todos);

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
