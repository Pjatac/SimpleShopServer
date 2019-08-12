import * as express from "express";
export const register = ( app: express.Application ) => {
    app.get('/test', (req, res) => res.json('It work!'));
};