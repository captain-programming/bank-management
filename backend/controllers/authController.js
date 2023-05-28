const UserModel = require("../models/User");
const { generateAccessToken } = require("../utils/auth");

exports.loginUser=async(req, res)=>{
  const { email, password } = req.body;
  const {role} = req.headers;
  try{
    const user = await UserModel.findOne({ email, role});
    console.log(user, role)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password!==password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const accessToken = generateAccessToken(user._id);
    user.accessToken = accessToken
    await user.save();
    res.json({userId: user._id, email: user.email, accessToken: accessToken, amount: user.amount, name: user.name, username: user.username});

  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.createUser=async(req, res)=>{
  const { email, password, name, username, role} = req.body;
  
  try{
    const existingUser = await UserModel.findOne({ email });
    const checkUsername = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(404).json({ message: 'Already registered email' });
    }
    if (checkUsername) {
      return res.status(404).json({ message: 'Username not available' });
    }

    await UserModel.create({email, password, name, username, role});

    res.json({message: "Successfully registered"});

  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}