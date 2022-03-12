const mongoose = require('mongoose')


const Post = mongoose.Schema({
    userId : {
         type: mongoose.Schema.Types.ObjectId, ref:'UserData'
    },
    problemID:{
         type: mongoose.Schema.Types.ObjectId, ref:'Problem'
    },
    title:String,
    message:String,
    selectedFile :String,
    type:{  
        type:String,
        default:'INOVATION'},
    likeCount:{
        type:Number,
        default:0
    },
    CreatedAt:{
        type:Date,
        default: new Date()
    },

});


const model = mongoose.model('PostMessage' , Post);

module.exports = model