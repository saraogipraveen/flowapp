const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


require('dotenv').config()


const db = require('./db')

const app = express()
const apiPort = process.env.PORT || 5000

// MIDDLEWARES
app.use(cors())
app.use(express.json())

// MONDOGDB CONNECTION CHECK 
db.once('open',()=> console.log('MongoDB connected'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// ROUTES
app.get('/', (req, res) => {
    res.send('Hello flowapp!')
})

const usersRouter = require('./routes/users')
const workflowsRouter = require('./routes/workflows')
const nodesRouter = require('./routes/nodes')


app.use('/users',usersRouter)
app.use('/workflows',workflowsRouter)
app.use('/nodes',nodesRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))