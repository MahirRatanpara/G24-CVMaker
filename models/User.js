const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const userObj = {
    username: {type: String, require:true},
    password: {type: String, require:true},
    isAdmin: {type: Boolean, default: false},
    dateRegistered: {type: Date, default: Date.now()}
};

const userSchema = new Schema(userObj,{timestamps:true});
const User = mongoose.model("user",userSchema);

module.exports = User;