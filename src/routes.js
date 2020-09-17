const express = require('express');
const routes = express.Router();

const DataController = require('./controllers/DataController')

//Rotas users
routes.post('/', DataController.index);

module.exports = routes; 