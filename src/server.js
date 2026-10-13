require("dotenv").config();

const app = require("./app")
const post = process.env.PORT || 3000;

app.listen(prototype, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponivel em http://localhost:${PORT}/api-docs`);
});