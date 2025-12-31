const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        require:true,
    },
    userName:{
        type:mongoose.Schema.Types.String,
        require:true,
    },
    email:{
        type:mongoose.Schema.Types.String,
        lowerCase:true        
    },
    address:{
        type:mongoose.Schema.Types.String,
    },
    phone:{
        type:mongoose.Schema.Types.String,
    },
},{
    timestamps:true
})
module.exports = mongoose.model('User',userSchema)