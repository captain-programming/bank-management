const UserModel = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const {accesstoken, userid} = req.headers;

  try {
    const admin = await UserModel.findById(userid);

    if(accesstoken!==admin.accessToken){
      return res.status(400).json({ message: 'Not access !'});
    }

    const userList = await UserModel.find({role: "customer"}, {password: 0, accessToken: 0});

    res.json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};