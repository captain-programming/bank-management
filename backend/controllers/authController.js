const UserModel = require("../models/User");
const { generateAccessToken } = require("../utils/auth");

exports.loginUser=async(req, res)=>{
  const { email, password } = req.body;
  const {role} = req.headers;
  try{
    const user = await UserModel.findOne({ email, role});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password!==password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const accessToken = generateAccessToken(user._id);
    user.accessToken = accessToken
    await user.save();
    res.json({userId: user._id, email: user.email, accessToken: accessToken, amount: user.amount});

  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}