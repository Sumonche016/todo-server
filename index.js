const express = require('express')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()

//midew3are 
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ndjoo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const datacollection = client.db('todo').collection('todo-data')
        app.post('/todo', async (req, res) => {
            const data = req.body;
            const result = await datacollection.insertOne(data)
            res.send(result)
        })

        app.get('/todo', async (req, res) => {
            const query = {}
            const result = await datacollection.find(query).toArray()
            res.send(result)
        })


        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await datacollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)






app.get('/', (req, res) => {
    res.send('runnig the server')

})

app.listen(port, () => {
    console.log('working')
})