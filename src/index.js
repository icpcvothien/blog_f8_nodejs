const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path=require('path');

const app = express();
const port = 3000;

const route = require('./routes/index');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// http logger
// app.use(morgan('combined'));
app.use(morgan('combined', {
  skip: (req) =>
    req.path === '/.well-known/appspecific/com.chrome.devtools.json',
}));
// Template engine
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs'); // đặt hbs làm đuôi template mặc định
app.set('views', path.join(__dirname, 'resources/views'));

// routes init

route(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
