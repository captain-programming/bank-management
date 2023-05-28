const { Router } = require("express");
const { loginUser, createUser } = require("../controllers/authController");

const authRoutes = Router();
authRoutes.get("/", async(req, res)=> res.send('Auth'));
authRoutes.post("/login", loginUser)
authRoutes.post("/create", createUser)

module.exports = authRoutes;