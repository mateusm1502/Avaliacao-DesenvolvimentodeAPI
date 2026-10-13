const express = require("express");

const router = express.Router();

const missoes = require("../data/missoes");

// GET /missoes
router.get("/", (req, res) => {
    res.status(200).json(missoes);
});

// GET /missoes/:id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const missao = missoes.find((item) => item.id === id);

    if (!missao) {
        return res.status(404).json({
            erro: "Missão não encontrada"
        });
    }

    res.status(200).json(missao);
});

// POST /missoes
router.post("/", (req, res) => {
    const { nome, ano, agencia, status } = req.body;

    if (!nome || !ano || !agencia || !status) {
        return res.status(400).json({
            erro: "Os campos nome, ano, agencia e status são obrigatórios"
        });
    }

    const novaMissao = {
        id: missoes.length > 0
            ? Math.max(...missoes.map((item) => item.id)) + 1
            : 1,
        nome,
        ano,
        agencia,
        status
    };

    missoes.push(novaMissao);

    res.status(201).json(novaMissao);
});

// PUT /missoes/:id
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = missoes.findIndex((item) => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Missão não encontrada"
        });
    }

    const { nome, ano, agencia, status } = req.body;

    if (!nome || !ano || !agencia || !status) {
        return res.status(400).json({
            erro: "Os campos nome, ano, agencia e status são obrigatórios"
        });
    }

    missoes[indice] = {
        id,
        nome,
        ano,
        agencia,
        status
    };

    res.status(200).json(missoes[indice]);
});

// DELETE /missoes/:id
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = missoes.findIndex((item) => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Missão não encontrada"
        });
    }

    missoes.splice(indice, 1);

    res.status(204).send();
});

module.exports = router;