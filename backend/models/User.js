const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  role: { type: String, enum: ['admin', 'customer'], default: 'customer'},
  accessToken: { type: String },
  amount: {type:Number, required: true, default: 0}
})

const UserModel = model('users', UserSchema);

module.exports = UserModel;