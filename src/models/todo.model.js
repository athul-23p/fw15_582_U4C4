const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title : {type:String,required:true},
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        path:'user'
    }
},{
    timestamps:true
});

module.exports = mongoose.model('todo',todoSchema);
