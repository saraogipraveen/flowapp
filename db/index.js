
const mongoose = require('mongoose')

const uri = process.env.ATLAS_URI || 'mongodb+srv://flowapp:flowapppassword@flowapp-7dshm.mongodb.net/test?retryWrites=true&w=majority'
mongoose
    .connect(uri,
        {
            useFindAndModify:false,  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true
        }
    )
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db