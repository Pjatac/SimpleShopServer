"use strict";
exports.__esModule = true;
exports.register = function (app) {
    app.get('/test', function (req, res) { return res.json('It work!'); });
};
