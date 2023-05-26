const { Router } = require("express");

const userRoutes = Router();
userRoutes.get("/", (req, res)=> res.send('User'));

module.exports = userRoutes;