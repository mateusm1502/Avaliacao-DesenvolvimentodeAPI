const express = require('espress');
const missoesRouter = require('./router/missoes.router');
const setupSwagger = require('./docs/swagger');
const { setup } = require('swagger-ui-express');

const app = express();
app.use(express.json());

setupSwagger(app);
app.use('/', missoesRouter);
app.use((req, res => {
    res.status(404).json({erro: "Not Found", mensagem: "Rota nao encontrado"})
}))
export default app;