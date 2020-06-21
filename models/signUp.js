const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 4)
const uniqueValidator = require('mongoose-unique-validator');

const btcStatus = mongoose.Schema({
  deposit: {type: String},
  lastIncrementedTime: {type:Date},
  referralBonus: {type: Number}
})

const userSchema = mongoose.Schema({
  name: { type: String, required: true},
  userName: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  plan: {type: String, required: true},
  password: { type: String, required: true },
  referralCount: {type: Number},
  balance: {type: String},
  status: btcStatus,
  createdAt: {type: Date, default: Date.now()}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserSignUp', userSchema);