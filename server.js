const express = require('express')
const cors = require('cors')


require('dotenv').config()


const db = require('./db')

const app = express()
const apiPort = process.env.PORT || 5000

// MIDDLEWARES


app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST,  PUT, DELETE");

    next();
});

// MONDOGDB CONNECTION CHECK 
db.once('open', () => console.log('MongoDB connected'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// ROUTES
app.get('/', (req, res) => {
    res.send('Hello flowapp!')
})

app.options('*', cors()) // include before other routes

app.use('/users', require('./routes/users'))
app.use('/workflows', require('./routes/workflows'))
app.use('/nodes', require('./routes/nodes'))


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))