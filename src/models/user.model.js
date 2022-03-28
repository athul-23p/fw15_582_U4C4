const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email : {type:String,required:true},
  password: {type:String,required:true}
},{
    timestamps:true
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
userSchema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password)
});

module.exports = mongoose.model('user',userSchema);