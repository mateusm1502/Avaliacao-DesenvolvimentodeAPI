
import express from 'express';
import missoesRouter from './router/missoes.router.js';
import setupSwagger from './docs/swagger.js';

const app = express();

app.use(express.json());

setupSwagger(app);

app.use('/', missoesRouter);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada'
  });
});

// Tratamento de JSON malformado
app.use((err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    'body' in err
  ) {
    return res.status(400).json({
      erro: 'JSON inválido'
    });
  }

  next(err);
});

export default app;
