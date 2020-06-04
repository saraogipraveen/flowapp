const express = require('express')
const cors = require('cors')


require('dotenv').config()



const app = express()
const apiPort = process.env.PORT || 5000

// MIDDLEWARES


// app.use(cors())

// CORS -> Cross-Origin Resource Sharing
// Handling CORS errors
app.use((req, res, next) => {
    // we pass * as second arg because we want to allow access to everyone
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// MONDOGDB CONNECTION CHECK 
const db = require('./db')
db.once('open', () => console.log('MongoDB connected'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.use(express.json())
// ROUTES
app.get('/', (req, res) => {
    res.send('Hello flowapp!')
})

// app.options('*', cors()) // include before other routes

app.use('/users', require('./routes/users'))
app.use('/workflows', require('./routes/workflows'))
app.use('/nodes', require('./routes/nodes'))


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))