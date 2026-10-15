
const newsRoute=require('./news');
const siteRoute=require('./site');
const coursesRouter=require('./courses')
// control toan bo routes 

function route(app) {
    app.use('/news', newsRoute);
    app.use('/', siteRoute);
    app.use('/courses', coursesRouter);
}

module.exports = route;