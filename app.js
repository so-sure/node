require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');

const readPhone = require('./src/application_layer/phones/read');
const deletePhone = require('./src/application_layer/phones/delete');
const updatePhone = require('./src/application_layer/phones/update');
const dataAccessLayer = require('./src/data_access_layer/phones');

const app = express()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = process.env.NODE_PORT

app.get('/', (req, res) => res.send('Hello Worlds - So-sure-itw !'))

app.get("/phone/:id", async (request, response) => {
    let parsedInput;
    try {
      parsedInput = await deletePhone.parseInputParameters(request);
    } catch(err) {
        response.status(400).send(err);
    }

    try {
      const foundPhone = await dataAccessLayer.getPhoneById(parsedInput.id);

      response.json(foundPhone)
    } catch(err) {
        response.status(500).send('There was an error on the server');
    }
});

app.delete("/phone/:id", async (request, response) => {
    let parsedInput;

    try {
      parsedInput = await readPhone.parseInputParameters(request);
    } catch(err) {
        response.status(400).send(err);
    }

    try {
      const deletedPhoneId = await dataAccessLayer.deletePhoneById(parsedInput.id);

      response.json({ id: deletedPhoneId })
    } catch(err) {
        response.status(500).send('There was an error on the server');
    }
});

app.post("/phone/:id", jsonParser, async (request, response) => {
    let parsedInput;

    try {
      parsedInput = await updatePhone.parseInputParameters(request);
    } catch(err) {
        response.status(400).send(err.message);
    }

    try {
      const updatedPhone = await dataAccessLayer.updatePhone(parsedInput);

      response.json(updatedPhone)
    } catch(err) {
        response.status(500).send('There was an error on the server');
    }
});

app.listen(3000, () => console.log(`Example app listening at http://localhost:1337 form the host or http://localhost:${port} from docker`))
