const { Router } = require("express");
const { processTransaction, allTransaction } = require("../controllers/transactionController");

const transctionRoutes = Router();
transctionRoutes.get("/", (req, res)=> res.send('Transctions'));
transctionRoutes.post('/transiction-process', processTransaction)
transctionRoutes.get('/transiction-list', allTransaction)

module.exports = transctionRoutes;