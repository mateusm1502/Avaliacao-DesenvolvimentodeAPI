
import request from 'supertest';
import axios from 'axios';
import { jest } from '@jest/globals';
import app from '../src/app.js';
import { resetar } from '../src/data/missoes.js';

const JSON_REGEX = /application\/json/;

beforeEach(() => {
  resetar();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('GET /status retorna 200 e status ok', async () => {
  const resposta = await request(app).get('/status');

  expect(resposta.status).toBe(200);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
  expect(resposta.body).toEqual({ status: 'ok' });
});

test('GET /missoes retorna 200 e pelo menos 5 itens', async () => {
  const resposta = await request(app).get('/missoes');

  expect(resposta.status).toBe(200);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
  expect(Array.isArray(resposta.body)).toBe(true);
  expect(resposta.body.length).toBeGreaterThanOrEqual(5);
});

test('GET /missoes/:id retorna a missão correta', async () => {
  const resposta = await request(app).get('/missoes/1');

  expect(resposta.status).toBe(200);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
  expect(resposta.body.id).toBe(1);
  expect(resposta.body.nome).toBe('Apollo 11');
});

test('GET /missoes/:id retorna 404 para id inexistente', async () => {
  const resposta = await request(app).get('/missoes/999');

  expect(resposta.status).toBe(404);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
  expect(resposta.body).toEqual({ erro: 'Missão não encontrada' });
});

test('POST /missoes cria uma nova missão', async () => {
  const resposta = await request(app)
    .post('/missoes')
    .send({
      nome: 'Artemis III',
      ano: 2027,
      agencia: 'NASA',
      status: 'Planejada'
    });

  expect(resposta.status).toBe(201);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
  expect(resposta.body.id).toBeDefined();
  expect(resposta.body).toMatchObject({
    nome: 'Artemis III',
    ano: 2027,
    agencia: 'NASA',
    status: 'Planejada'
  });
});

test('POST /missoes retorna 400 quando falta o nome', async () => {
  const resposta = await request(app)
    .post('/missoes')
    .send({ ano: 2027, agencia: 'NASA', status: 'Planejada' });

  expect(resposta.status).toBe(400);
  expect(resposta.body.erro).toBe('Nome é obrigatório');
});

test('POST /missoes retorna 400 quando o ano é inválido', async () => {
  const resposta = await request(app)
    .post('/missoes')
    .send({
      nome: 'Teste',
      ano: 'abc',
      agencia: 'NASA',
      status: 'Planejada'
    });

  expect(resposta.status).toBe(400);
  expect(resposta.body.erro).toMatch(/Ano/);
});

test('POST /missoes retorna 400 quando falta agência ou status', async () => {
  const semAgencia = await request(app)
    .post('/missoes')
    .send({ nome: 'Teste', ano: 2000, status: 'Planejada' });

  const semStatus = await request(app)
    .post('/missoes')
    .send({ nome: 'Teste', ano: 2000, agencia: 'NASA' });

  expect(semAgencia.status).toBe(400);
  expect(semStatus.status).toBe(400);
});

test('POST /missoes retorna 400 sem corpo', async () => {
  const resposta = await request(app).post('/missoes');

  expect(resposta.status).toBe(400);
});

test('POST /missoes retorna 400 com JSON malformado', async () => {
  const resposta = await request(app)
    .post('/missoes')
    .set('Content-Type', 'application/json')
    .send('{ nome: ');

  expect(resposta.status).toBe(400);
  expect(resposta.body).toEqual({ erro: 'JSON inválido' });
});

test('PUT /missoes/:id atualiza a missão', async () => {
  const resposta = await request(app)
    .put('/missoes/3')
    .send({
      nome: 'Artemis II',
      ano: 2026,
      agencia: 'NASA',
      status: 'Em preparação'
    });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    id: 3,
    nome: 'Artemis II',
    ano: 2026,
    agencia: 'NASA',
    status: 'Em preparação'
  });
});

test('PUT /missoes/:id retorna 400 com dados inválidos', async () => {
  const resposta = await request(app)
    .put('/missoes/3')
    .send({ nome: '' });

  expect(resposta.status).toBe(400);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
});

test('PUT /missoes/:id retorna 404 para id inexistente', async () => {
  const resposta = await request(app)
    .put('/missoes/999')
    .send({ nome: 'X', ano: 2000, agencia: 'Y', status: 'Z' });

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ erro: 'Missão não encontrada' });
});

test('DELETE /missoes/:id retorna 204', async () => {
  const resposta = await request(app).delete('/missoes/4');

  expect(resposta.status).toBe(204);
  expect(resposta.body).toEqual({});
});

test('DELETE /missoes/:id retorna 404 para id inexistente', async () => {
  const resposta = await request(app).delete('/missoes/999');

  expect(resposta.status).toBe(404);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
  expect(resposta.body).toEqual({ erro: 'Missão não encontrada' });
});

test('missão removida não é mais encontrada', async () => {
  await request(app).delete('/missoes/2');
  const resposta = await request(app).get('/missoes/2');

  expect(resposta.status).toBe(404);
});

test('novo id não repete após remoção', async () => {
  await request(app).delete('/missoes/6');

  const resposta = await request(app)
    .post('/missoes')
    .send({
      nome: 'Nova',
      ano: 2030,
      agencia: 'ESA',
      status: 'Planejada'
    });

  const todas = await request(app).get('/missoes');
  const ids = todas.body.map((m) => m.id);

  expect(resposta.status).toBe(201);
  expect(new Set(ids).size).toBe(ids.length);
});

test('rota inexistente retorna 404 em JSON', async () => {
  const resposta = await request(app).get('/rota-que-nao-existe');

  expect(resposta.status).toBe(404);
  expect(resposta.headers['content-type']).toMatch(JSON_REGEX);
  expect(resposta.body).toEqual({ erro: 'Rota não encontrada' });
});

test('GET /api-docs exibe o Swagger UI', async () => {
  const resposta = await request(app).get('/api-docs/');

  expect(resposta.status).toBe(200);
  expect(resposta.text).toMatch(/swagger/i);
});

test('GET /apod retorna os dados da NASA', async () => {
  jest.spyOn(axios, 'get').mockResolvedValueOnce({
    data: { title: 'Imagem astronômica do dia' }
  });

  const resposta = await request(app).get('/apod');

  expect(resposta.status).toBe(200);
  expect(resposta.body.title).toBe('Imagem astronômica do dia');
});

test('GET /apod envia a data informada', async () => {
  jest.spyOn(axios, 'get').mockResolvedValueOnce({
    data: { date: '2026-10-20' }
  });

  const resposta = await request(app).get('/apod?date=2026-10-20');

  expect(resposta.status).toBe(200);
  expect(axios.get).toHaveBeenCalledWith(
    'https://api.nasa.gov/planetary/apod',
    expect.objectContaining({
      params: expect.objectContaining({ date: '2026-10-20' })
    })
  );
});

test('GET /apod retorna 400 para data em formato inválido', async () => {
  const resposta = await request(app).get('/apod?date=20-10-2026');

  expect(resposta.status).toBe(400);
  expect(resposta.body.erro).toBe('Data em formato inválido');
});

test('GET /apod trata tempo limite da NASA', async () => {
  jest.spyOn(axios, 'get').mockRejectedValueOnce({
    code: 'ECONNABORTED'
  });

  const resposta = await request(app).get('/apod');

  expect(resposta.status).toBe(504);
  expect(resposta.body.erro).toBe('Gateway Timeout');
});

test.each([400, 429])(
  'GET /apod trata erro HTTP %i da NASA',
  async (status) => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce({
      response: { status }
    });

    const resposta = await request(app).get('/apod');

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe('Bad Request');
  }
);

test('GET /apod trata outros erros HTTP da NASA', async () => {
  jest.spyOn(axios, 'get').mockRejectedValueOnce({
    response: { status: 500 }
  });

  const resposta = await request(app).get('/apod');

  expect(resposta.status).toBe(502);
  expect(resposta.body.erro).toBe('Bad Gateway');
});

test('GET /apod trata erro de conexão com a NASA', async () => {
  jest.spyOn(axios, 'get').mockRejectedValueOnce(
    new Error('Erro de conexão')
  );

  const resposta = await request(app).get('/apod');

  expect(resposta.status).toBe(502);
  expect(resposta.body.erro).toBe('Bad Gateway');
  expect(resposta.body.mensagem).toBe(
    'Erro de conexão com a API externa.'
  );
});
