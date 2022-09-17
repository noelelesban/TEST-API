console.log('hellow')
let express =require('express')
let app = express()
const mongoose =require('mongoose')
let bodyParser = require('body-parser')

app.use(bodyParser.json()) //parse json data


let accountRoute = require('./routes/account')

app.use(accountRoute)		// 
app.use(express.static('public'))

/*app.use('/posts', () => {
	console.log('working')
})*/

//connect to DB
mongoose.connect('mongodb+srv://username:password@cluster0.wx5kh7t.mongodb.net/?retryWrites=true&w=majority', () =>
	console.log('Connected to DB'));


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`SERVER STARTED ON ${PORT}`))
