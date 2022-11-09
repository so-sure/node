const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.NODE_PORT

app.get('/', (req, res) => res.send('Hello Worlds - So-sure-itw !'))


app.get("/phone/:id", async (req, res) => {
    const { phoneId } = parseInputParameters()
    const id = req.params.id;
});

app.listen(port, () => console.log(`Example app listening at http://localhost:1337 form the host or http://localhost:${port} from docker`))
