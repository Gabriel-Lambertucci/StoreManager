const express = require('express');
const app = require('./app');

require('dotenv').config();

const routes = require('./routes/index');

//  não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto 

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
