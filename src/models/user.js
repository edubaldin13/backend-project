const mongoose = require('../database/db');
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true, //turns every email to lowercase
    },
    password:{
        type:String,
        required:true,
        select:false, //on db searches it doesnt come with others
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});
UserSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})
const User = mongoose.model('User', UserSchema);

module.exports = User;