const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const transctionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());  

app.use("/auth", authRoutes);
app.use("/transiction", transctionRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to bank");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, async() => {
  try{
    await dbConnect();
    console.log(`server started on port ${PORT}`);  
  }catch(err){
    if(err.message==="querySrv ECONNREFUSED _mongodb._tcp.cluster0.3pvw9hk.mongodb.net"){
      console.log("Network not connected");
    }else{
      console.log(err.message);
    }
  }
})