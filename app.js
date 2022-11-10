require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');

const applicationLayer = require('./src/application_layer');
const dataAccessLayer = require('./src/data_access_layer');

const app = express()
const jsonParser = bodyParser.json()

const port = process.env.NODE_PORT

app.get('/', (req, res) => res.send('Hello Worlds - So-sure-itw !'))

app.get("/phone/:id", async (request, response) => {
    let parsedInput;
    try {
      parsedInput = await applicationLayer.phones.delete.parseInputParameters(request);
    } catch(err) {
        response.status(400).send(err);
    }

    try {
      const foundPhone = await dataAccessLayer.phones.getPhoneById(parsedInput.id);

      response.json(foundPhone)
    } catch(err) {
        response.status(500).send('There was an error on the server');
    }
});

app.delete("/phone/:id", async (request, response) => {
    let parsedInput;

    try {
      parsedInput = await applicationLayer.phones.read.parseInputParameters(request);
    } catch(err) {
        response.status(400).send(err);
    }

    try {
      const deletedPhoneId = await dataAccessLayer.phones.deletePhoneById(parsedInput.id);

      response.json({ id: deletedPhoneId })
    } catch(err) {
        response.status(500).send('There was an error on the server');
    }
});

app.post("/phone/:id", jsonParser, async (request, response) => {
    let parsedInput;

    try {
      parsedInput = await applicationLayer.phones.update.parseInputParameters(request);
    } catch(err) {
        response.status(400).send(err.message);
    }

    try {
      const updatedPhone = await dataAccessLayer.phones.updatePhone(parsedInput);

      response.json(updatedPhone)
    } catch(err) {
        response.status(500).send('There was an error on the server');
    }
});

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000 form the host or http://localhost:${3000} from docker`))
