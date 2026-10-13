const express = require("express");
const swaggerUi = require("swagger-ui-express");

const missoesRoutes = require("./routes/missoes.routes");
const swaggerDocument = require("./docs/swagger");
const { consultarApod } = require("./services/nasa.service");

const app = express();

app.use(express.json());

app.get("/status", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

app.use("/missoes", missoesRoutes);

app.get("/apod", async (req, res) => {
    try {
        const { date } = req.query;

        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                erro: "A data deve estar no formato YYYY-MM-DD"
            });
        }

        const dados = await consultarApod(date);

        res.status(200).json(dados);
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return res.status(400).json({
                    erro: "Data inválida ou rejeitada pela NASA"
                });
            }

            if (error.response.status === 429) {
                return res.status(429).json({
                    erro: "Limite de requisições da NASA atingido"
                });
            }

            return res.status(502).json({
                erro: "Falha ao consultar a NASA"
            });
        }

        res.status(504).json({
            erro: "A NASA não respondeu dentro do tempo limite"
        });
    }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app