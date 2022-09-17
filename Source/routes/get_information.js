let express = require('express')
let router = express.Router()
let Post =require('../data_models/schema')			//User Transactions file in database 
let accinfo =require('../data_models/schema') 	//User Accounts file in database
fresh = require('fresh')  //Library to compare Etag values
etag = require('etag')  //Etag library


function versionCheck(req, res)										//To compare Etag values
{
		try
		{
			let resHeader = { etag: JSON.parse(res.get('etag')), 'if-none-match': '*'}
			let reqHeader = { etag: req.header['etag'] != ' '? JSON.parse(req.headers['etag']) : req.headers['etag']}
			return fresh(reqHeader, resHeader)
		}
		catch(error)
		{
			console.log(error)
		}
}
/* Get user account by searching with Email
	 http://localhost:3000/account/information?email=value
*/	 

router.get('/account/information',(req, res) => {
	if(!req.query.email)
	{
		return res.status(400).send('Please enter the user Email')
	}
	Post.findOne({
		userEmail: req.query.email
	})
		.then(doc => {
			if(!doc || doc.length == 0) {
				return res.status(500).send(doc)
			}
			res.status(201).send(doc)
		})
		.catch(err => {
			res.status(500).json(err)
		})

})

/*
  Perform Transactions (Send Tokens)
  The variable amount stores the the number of tokens to be transferred
  The variable id is the account ID
  http://localhost:3000/account/transaction/send?amount=' '&id=' '
*/

router.put('/account/transaction/send',(req, res) => {
	res.setHeader('etag', etag(Buffer.from(JSON.stringify(body))))				//To compare Etag value for Optimistic Concurrency
	if(versionCheck(req, res))																						//To check if Etag values match
	{
		res.status(304).send('Transaction cannot be validated at this time')
	}
	else
	{
		accinfo.findOne({_id :req.params.id}, function(err,foundObject) { // Search for Account ID in account-data.json file from the database	
		if(error)
		{
			console.log(err)
			res.status(400).send('User Account not Found')
		}
		else
		{
	 	
	 		if(accinfo.status = "active")				//check if account is active
			{				
	 			Post.findOneAndUpdate({userEmail:accinfo.userEmail},{$inc : {amount : req.params.amount}}, {new : true} ,(error, data) => {				//	Seacrh for the User Email in the transaction-data.json file from the daatbase
	 			if(error)
	 			{
	 				console.log(error)
	 				res.status(400).send()
	 			}
	 			else
	 			{
	 				console.log(data)

	 			}
	 									})	
	 		}
	 		else
	 		{
	 			console.log(error)
	 			res.statu(400).send('Uset Account is not Active')	
	 		}
	 				
	 	}
	 	})	
	}
	
})

/*
  Perform Transactions (Recieve Tokens)
  The variable amount stores the the number of tokens to be transferred
  The variable id is the account ID
  http://localhost:3000/account/transaction/send?amount=' '&id=' '
*/


router.put('/account/transaction/recieve',(req, res) => {
	res.setHeader('etag', etag(Buffer.from(JSON.stringify(body))))				//To compare Etag value for Optimistic Concurrency
	if(versionCheck(req, res))																						//To check if Etag values match
	{
			res.status(304).send('Transaction cannot be validated at this time')
	}
	else
	{
		var amount1 = Post.amount       //To store the Users balance amount from the transactions-api.json file database 
		var amount2 = req.params.amount     //To store number of tokens to be transfered from the User Account 
		if(amount2 - amount1 >= 0)			//check if the final balance will become negative after the transaction
		{
	 		accinfo.findOne({_id :req.params.id}, function(err, foundObject) {		// Search for Account ID in account-data.json file from the database
	 		if(err)
	 		{
	 			console.log(err)
	 			res.status(400).send('User Account not Found')
	 		}
	 		else
	 		{
	 			if(accinfo.status = "active")				//check if account is active
				{
	 				Post.findOneAndUpdate({userEmail:accinfo.userEmail},{$inc : {amount : req.params.amount}}, {new : true} ,(error, data) => {				//	Seacrh for the User Email in the transaction-data.json file from the daatbase
	 				if(error)
	 				{
	 					console.log(error)
	 					res.status(400).send()
	 				}
	 				else
	 				{
	 					console.log(data)

	 				}
	 				})	
	 			}
	 			else
	 			{
	 				console.log(error)
	 				res.statu(400).send('Uset Account is not Active')	
	 			}
	 		}
	 		}) 

		}
		else
		{	
			console.log('Insufficient Tokens in User Account')
		}
		 
	}
})
		

/*Update Account status in the database file
	http://localhost:3000/account/update/?status=' '&id=' '
*/

router.put('/account/update/:id',(req, res) => {
	res.setHeader('etag', etag(Buffer.from(JSON.stringify(body))))				//To compare Etag value of data for Optimistic Concurrency
	if(versionCheck(req, res))																						//To check if Etag values match
	{
			res.status(304).send('User Account cannot be updated at this time')
	}
	else
	{
			accinfo.findOneAndUpdate({_id :req.params.id},{status :req.params.status}, {new : true} ,(error, data) => {
			if(error)
			{
				console.log(error)
				res.status(400).send()
			}
			else
			{
					console.log(data)
			}
		 	})

	}
				
})


module.exports = router
