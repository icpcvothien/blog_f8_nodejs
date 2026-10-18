
module.exports = function (req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    }
    if (Object.hasOwn(req.query, '_sort')){
        res.locals._sort.enabled = true;
        res.locals._sort.type = req.query.type;
        Object.assign(res.locals._sort, {
            enabled: true,
            column: req.query.column,
            type: req.query.type,
        });
    }

    next();
}