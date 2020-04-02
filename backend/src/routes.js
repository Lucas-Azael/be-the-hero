const express = require('express');
const OngController = require('./Controllers/OngsController');
const IncidentController = require('./Controllers/IncidentsController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController')

const routes = express.Router(); //desaclopando o modulo de rotas na var

routes.post('/login', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;