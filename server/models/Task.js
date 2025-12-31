const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        require:true,
    },
    completed:{
        type:Boolean,
        default:false
    },
    tags:{
        type: [String]
    }

},{
    timestamps:true
})
module.exports = mongoose.model('Task',taskSchema)