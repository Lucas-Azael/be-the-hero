const express = require('express'); //Importando o modulo express para dentro da variavel express
const cors = require('cors');
const routes = require('./routes');

const app = express(); //inicalizando a aplicação

app.use(cors())
app.use(express.json()); //definindo função para receber dados em formato json
app.use(routes);

app.listen(3333); //ouvir a porta