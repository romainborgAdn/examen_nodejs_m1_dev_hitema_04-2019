const express = require('express');

const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();
const v1 = express.Router();

module.exports = app;


const bodyParser = require('body-parser');

// Basic Auth
const { digestAuth } = require('../basic-auth/basic-auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

app.get('/people', async (request, response) => {
    const data = await peopleService.getPeople();
    response.send(data);
});

app.put('/people/:id', async (request, response) => {
    const id = request.params.id;
    const people = {...request.name };
    try {
        const result = await peopleService.updatePeople(id, people);
        response.sendStatus(200);
    } catch (error) {
        console.log('error update people: ', error);
        response.sendStatus(400).end(error);
    }
});



