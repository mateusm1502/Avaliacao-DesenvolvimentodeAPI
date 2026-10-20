
import express from 'express';
import {
  listarMissoes,
  buscarMissao,
  criarMissao,
  atualizarMissao,
  excluirMissao
} from '../data/missoes.js';
import { getApod } from '../services/nasa.service.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/missoes', (req, res) => {
  res.status(200).json(listarMissoes());
});

router.get('/missoes/:id', (req, res) => {
  const missao = buscarMissao(req.params.id);

  if (!missao) {
    return res.status(404).json({
      erro: 'Missão não encontrada'
    });
  }

  res.status(200).json(missao);
});

router.post('/missoes', (req, res) => {
  const { nome, ano, agencia, status } = req.body || {};

  if (!nome || typeof nome !== 'string' || !nome.trim()) {
    return res.status(400).json({
      erro: 'Nome é obrigatório'
    });
  }

  if (
    ano === undefined ||
    ano === null ||
    ano === '' ||
    !Number.isInteger(Number(ano)) ||
    Number(ano) <= 0
  ) {
    return res.status(400).json({
      erro: 'Ano inválido'
    });
  }

  if (!agencia || !status) {
    return res.status(400).json({
      erro: 'Agência e status são obrigatórios'
    });
  }

  const novaMissao = criarMissao({
    nome,
    ano: Number(ano),
    agencia,
    status
  });

  res.status(201).json(novaMissao);
});

router.put('/missoes/:id', (req, res) => {
  const { nome, ano, agencia, status } = req.body || {};

  if (
    (nome !== undefined &&
      (typeof nome !== 'string' || !nome.trim())) ||
    (ano !== undefined &&
      (ano === null ||
        ano === '' ||
        !Number.isInteger(Number(ano)) ||
        Number(ano) <= 0)) ||
    (agencia !== undefined &&
      (typeof agencia !== 'string' || !agencia.trim())) ||
    (status !== undefined &&
      (typeof status !== 'string' || !status.trim()))
  ) {
    return res.status(400).json({
      erro: 'Dados inválidos'
    });
  }

  const missao = atualizarMissao(req.params.id, {
    ...(nome !== undefined && { nome }),
    ...(ano !== undefined && { ano: Number(ano) }),
    ...(agencia !== undefined && { agencia }),
    ...(status !== undefined && { status })
  });

  if (!missao) {
    return res.status(404).json({
      erro: 'Missão não encontrada'
    });
  }

  res.status(200).json(missao);
});

router.delete('/missoes/:id', (req, res) => {
  const removida = excluirMissao(req.params.id);

  if (!removida) {
    return res.status(404).json({
      erro: 'Missão não encontrada'
    });
  }

  res.status(204).send();
});

router.get('/apod', async (req, res) => {
  try {
    const { date } = req.query;

    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        erro: 'Data em formato inválido'
      });
    }

    const dados = await getApod(date);

    res.status(200).json(dados);
  } catch (error) {
    res.status(error.status || 500).json({
      erro: error.erro || 'Erro',
      mensagem: error.mensagem || error.message
    });
  }
});

export default router;
