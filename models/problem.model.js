const mongoose = require('mongoose')


const Problem = mongoose.Schema({
    userId : {
         type: mongoose.Schema.Types.ObjectId, ref:'UserData'
    },
    message:{ type: String, required: true, unique: true },
    likeCount:{
        type:Number,
        default:0
    },
    CreatedAt:{
        type:Date,
        default: new Date()
    },

});


const model = mongoose.model('Problem' , Problem);

module.exports = model