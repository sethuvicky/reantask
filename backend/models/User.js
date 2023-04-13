let mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  email: {type:String,unique:true},
  username: {type:String},
  password: {type:String},
});

const User = mongoose.model('User', UserSchema);


module.exports = User;
