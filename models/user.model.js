const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		firstname: { type: String},
		lastname: { type: String},
		email: { type: String, unique: true },
		phoneno: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		type:{type:String},
		
	},
	{ collection: 'user-data' }

)

const model = mongoose.model('UserData', User)

module.exports = model
