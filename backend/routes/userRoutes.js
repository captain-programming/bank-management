const { Router } = require("express");
const { getAllUsers } = require("../controllers/userController");

const userRoutes = Router();
userRoutes.get("/", (req, res)=> res.send('User'));
userRoutes.get("/customer-list", getAllUsers);

module.exports = userRoutes;