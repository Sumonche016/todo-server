const express = require('express')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()

//midew3are 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('runnig the server')

})

app.listen(port, () => {
    console.log('working')
})