const { Router } = require("express");
const { loginUser } = require("../controllers/authController");

const authRoutes = Router();
authRoutes.get("/", async(req, res)=> res.send('Auth'));
authRoutes.post("/login", loginUser)

module.exports = authRoutes;