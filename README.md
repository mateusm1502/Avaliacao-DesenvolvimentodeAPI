# Avaliacao-DesenvolvimentodeAPI

# API REST de Missões Espaciais 🚀

## 1. Identificação

- **Aluno:** Mateus Moreira Pinto
- **Unidade Curricular:** Desenvolver Serviços Web
- **Curso:** Informatica para Internet

## 2. Descrição do Projeto

Este projeto é uma API REST para cadastrar, consultar, atualizar e excluir missões espaciais. Também possui integração com a API da NASA para consultar a imagem astronômica do dia.

## 3. Tecnologias Utilizadas

- Node.js
- Express
- JavaScript
- Axios
- Jest e Supertest
- Swagger
- JSON
- dotenv

## 4. Como Clonar o Projeto

```bash
git clone URL_DO_REPOSITORIO
cd Avaliacao-DesenvolvimentodeAPI
```

## 5. Instalar as Dependências

```bash
npm install
```

## 6. Executar o Projeto

Configure o arquivo `.env` com sua chave da NASA e execute:

```bash
npm start
```

- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## 7. Executar os Testes

```bash
npm test
```

Os testes verificam as rotas da API, o cadastro e a atualização das missões, a exclusão, os erros e a documentação.

## 8. Endpoints

| Método | Endpoint | Função |
|---|---|---|
| GET | `/status` | Verifica se a API funciona |
| GET | `/missoes` | Lista as missões |
| GET | `/missoes/:id` | Busca uma missão |
| POST | `/missoes` | Cadastra uma missão |
| PUT | `/missoes/:id` | Atualiza uma missão |
| DELETE | `/missoes/:id` | Exclui uma missão |
| GET | `/apod` | Consulta a API da NASA |
| GET | `/api-docs` | Abre a documentação Swagger |

## 9. Evidências

Adicionar uma captura de tela dos testes passando e outra da documentação Swagger.

## Considerações Finais

O projeto ajudou a praticar a criação de APIs REST, o uso de rotas, os testes automatizados e a documentação com Swagger.