const mongoose = require('mongoose')
const potoSchema = new mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    imageUrl:{
        type:mongoose.Schema.Types.String,
        required:true,
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Poto',potoSchema)