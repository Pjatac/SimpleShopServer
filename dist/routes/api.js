"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = function (app) {
    app.get('/test', function (req, res) { return res.json('It work!'); });
};
//# sourceMappingURL=api.js.map