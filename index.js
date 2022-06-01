const app = require('./app');

require('dotenv').config();

const routes = require('./routes/index');

//  não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto 

app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
