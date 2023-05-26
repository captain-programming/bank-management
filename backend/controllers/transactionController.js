const AccountModel = require("../models/Account");
const UserModel = require("../models/User");

exports.processTransaction = async (req, res) => {
  const { amount, type } = req.body;
  const {accesstoken, userid} = req.headers;

  try {
    const user = await UserModel.findById(userid);

    if(accesstoken!==user.accessToken){
      return res.status(400).json({ message: 'Not access'});
    }
    
    if (type === 'deposit') {
      user.amount += Number(amount);
    }else if (type === 'withdraw'){
      if (user.amount < Number(amount)) {
        return res.status(400).json({ message: 'Insufficient Funds' });
      }
      user.amount -= Number(amount);
    }
    await user.save();
    
    const transaction = new AccountModel({ user: userid, amount, transactionType: type });

    await transaction.save();

    res.json({ message: 'Transaction processed successfully', user: {userId: user._id, email: user.email, accessToken: user.accessToken, amount: user.amount}});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.allTransaction = async (req, res) => {
  const {accesstoken, userid} = req.headers;

  try {
    const user = await UserModel.findById(userid);

    if(accesstoken!==user.accessToken){
      return res.status(400).json({ message: 'Not access'});
    }

    const transactionList = await AccountModel.find({ user: userid });

    res.json(transactionList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};