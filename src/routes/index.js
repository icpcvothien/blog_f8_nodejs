


const newsRoute=require('./news');
const siteRoute=require('./site');
// control toan bo routes 

function route(app) {
    app.use('/news', newsRoute);
    app.use('/', siteRoute);
}

module.exports = route;