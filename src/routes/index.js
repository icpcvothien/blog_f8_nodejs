const meRouter=require('./me')
const newsRouter=require('./news');
const siteRouter=require('./site');
const coursesRouter=require('./courses')
// control toan bo routes 

function route(app) {
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
    
}

module.exports = route;