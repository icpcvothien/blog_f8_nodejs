const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path=require('path');
const methodOverride=require('method-override');
const sortMiddleware=require('./app/middlewares/SortMiddleware');

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

app.use(sortMiddleware);
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
      sum: (a, b)=> a+b,
      sortable: (field, sort)=>{
        const sortType= (field===sort.column) ? sort.type : 'default';  
        const icons={
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };
        const types={
          default: 'asc',
          asc: 'desc',
          desc: 'asc',
        };

        const type=types[sortType];
        const icon=icons[sortType];
        return `<a href="?_sort&column=${field}&type=${type}"
            class="text-decoration-none">
              <span class="${icon}" aria-hidden="true"></span>
          </a>`
      }
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
