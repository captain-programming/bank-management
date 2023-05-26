const { Schema, model } = require("mongoose");

const AccountSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  transactionType: { type: String, enum: ['deposit', 'withdraw'], required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
})

const AccountModel = model('accounts', AccountSchema);

module.exports = AccountModel;