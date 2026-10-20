
const missoesIniciais = [
  {
    id: 1,
    nome: 'Apollo 11',
    ano: 1969,
    agencia: 'NASA',
    status: 'Concluida'
  },
  {
    id: 2,
    nome: 'Voyager 1',
    ano: 1977,
    agencia: 'NASA',
    status: 'Em operacao'
  },
  {
    id: 3,
    nome: 'Artemis II',
    ano: 2026,
    agencia: 'NASA',
    status: 'Planejada'
  },
  {
    id: 4,
    nome: 'James Webb Space Telescope',
    ano: 2021,
    agencia: 'NASA',
    status: 'Em operacao'
  },
  {
    id: 5,
    nome: 'Curiosity',
    ano: 2012,
    agencia: 'NASA',
    status: 'Em operacao'
  }
];

let missoes = missoesIniciais.map(missao => ({ ...missao }));
let proximoId = 6;

export function listarMissoes() {
  return missoes;
}

export function buscarMissao(id) {
  return missoes.find(missao => missao.id === Number(id));
}

export function criarMissao(dados) {
  const novaMissao = {
    id: proximoId++,
    ...dados
  };

  missoes.push(novaMissao);
  return novaMissao;
}

export function atualizarMissao(id, dados) {
  const indice = missoes.findIndex(
    missao => missao.id === Number(id)
  );

  if (indice === -1) {
    return null;
  }

  missoes[indice] = {
    ...missoes[indice],
    ...dados,
    id: Number(id)
  };

  return missoes[indice];
}

export function excluirMissao(id) {
  const indice = missoes.findIndex(
    missao => missao.id === Number(id)
  );

  if (indice === -1) {
    return false;
  }

  missoes.splice(indice, 1);
  return true;
}

export function resetar() {
  missoes = missoesIniciais.map(missao => ({ ...missao }));
  proximoId = 6;
}
