const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path=require('path');
const methodOverride=require('method-override');

const app = express();
const port = 3000;

const route = require('./routes/index');
const db = require('./config/db');

// Connect to DB
db.connect();
// cấu hình cho template
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// http logger
// app.use(morgan('combined'));
app.use(morgan('combined', {
  skip: (req) =>
    req.path === '/.well-known/appspecific/com.chrome.devtools.json',
}));
// Template engine
app.engine(
  'hbs', 
  handlebars.engine({ 
    extname: '.hbs' ,
    helpers: {
      sum: (a, b)=> a+b
    }
  })
);
app.set('view engine', 'hbs'); // đặt hbs làm đuôi template mặc định
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init

route(app);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
