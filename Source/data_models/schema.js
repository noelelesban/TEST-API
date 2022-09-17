let mongoose = require('mongoose')

let PostSchema = new mongoose.Schema({  //Databse schems for Account transactions file in database
	userEmail: {
		type: String,
		required: true,
		unique: true
	},
	amount: {
		type: Number,
		required: true
	},
	type: {
		type:String
	},
	createdAt: {
		type: Date,
		default :Date.now
	}
	//createdAt: { type: Date() }
})

let AccountSchema = new mongoose.Schema({			//Databse schems for Account information file in database
	userEmail: {
		type: String,
		required: true,
		unique: true
	},
	status: {
		type:String
	},
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
	//createdAt: { type: Date() }
})

module.exports = mongoose.model('transactions', PostSchema)
module.exports = mongoose.model('useraccounts', AccountSchema)
