const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Post = require('./models/post.model')
const Problem = require('./models/problem.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

const CONNECTION_URL = 'mongodb+srv://metaverse:metaverse123@cluster1.1s5un.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL ,
     {useNewUrlParser: true ,  useUnifiedTopology: true })
     .then(() => app.listen(PORT , () => console.log(`Server is Running at Port ${PORT}`)))
     .catch((error) => console.log(error.message))

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phoneno: req.body.phoneno,
			type: req.body.type,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		phoneno: req.body.phoneno,
	})
     console.log(user)
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				phoneno: user.phoneno,
                    id :user._id
				
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	}
     else {
		return res.json({ status: 'error', user: false })

	}

})

app.post('/api/addinovation', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const id = decoded.id
		await Post.create({
               userId: id,
               title:req.body.title,
			   problemID:req.body.problemID,
               message:req.body.message,
               selectedFile :req.body.selectedFile,
			   type:req.body.type
          })

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/getinovation', async (req, res) => {
	

	try {
		const postdata = await Post.find({type:'INOVATION'});
		return res.json(postdata)
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})
app.get('/api/getsolution', async (req, res) => {
	

	try {
		const postdata = await Post.find({type:'SOLUTION'}).populate('problemID');
		return res.json(postdata)
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})


app.post('/api/addproblem', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const id = decoded.id
		await Problem.create({
               userId: id,
               message:req.body.message,
          })

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/getproblem', async (req, res) => {
	

	try {
		const problem = await Problem.find();
		return res.json(problem)
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})



