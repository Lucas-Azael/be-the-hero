const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //connection como modo development

module.exports = connection;