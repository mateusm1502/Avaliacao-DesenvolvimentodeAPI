const swaggerDocument = {
    openapi: "3.0.0",

    info: {
        title: "API de Missões Espaciais",
        version: "1.0.0",
        description: "API REST para consulta e gerenciamento de missões espaciais"
    },

    servers: [
        {
            url: "http://localhost:3000"
        }
    ],

    paths: {
        "/status": {
            get: {
                summary: "Verificar funcionamento da API",
                responses: {
                    200: {
                        description: "API funcionando"
                    }
                }
            }
        },

        "/missoes": {
            get: {
                summary: "Listar todas as missões",
                responses: {
                    200: {
                        description: "Lista de missões"
                    }
                }
            },

            post: {
                summary: "Cadastrar nova missão",

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Missao"
                            }
                        }
                    }
                },

                responses: {
                    201: {
                        description: "Missão criada"
                    },
                    400: {
                        description: "Dados inválidos"
                    }
                }
            }
        },

        "/missoes/{id}": {
            get: {
                summary: "Buscar missão por ID",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],

                responses: {
                    200: {
                        description: "Missão encontrada"
                    },
                    404: {
                        description: "Missão não encontrada"
                    }
                }
            },

            put: {
                summary: "Atualizar missão",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Missao"
                            }
                        }
                    }
                },

                responses: {
                    200: {
                        description: "Missão atualizada"
                    },
                    400: {
                        description: "Dados inválidos"
                    },
                    404: {
                        description: "Missão não encontrada"
                    }
                }
            },

            delete: {
                summary: "Remover missão",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],

                responses: {
                    204: {
                        description: "Missão removida"
                    },
                    404: {
                        description: "Missão não encontrada"
                    }
                }
            }
        },

        "/apod": {
            get: {
                summary: "Consultar foto astronômica do dia da NASA",

                parameters: [
                    {
                        name: "date",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            example: "2024-01-15"
                        }
                    }
                ],

                responses: {
                    200: {
                        description: "Dados da APOD"
                    },
                    400: {
                        description: "Data inválida"
                    },
                    429: {
                        description: "Limite da NASA atingido"
                    },
                    502: {
                        description: "Erro na NASA"
                    },
                    504: {
                        description: "Tempo limite excedido"
                    }
                }
            }
        }
    },

    components: {
        schemas: {
            Missao: {
                type: "object",

                required: [
                    "nome",
                    "ano",
                    "agencia",
                    "status"
                ],

                properties: {
                    id: {
                        type: "integer",
                        example: 1
                    },

                    nome: {
                        type: "string",
                        example: "Apollo 11"
                    },

                    ano: {
                        type: "integer",
                        example: 1969
                    },

                    agencia: {
                        type: "string",
                        example: "NASA"
                    },

                    status: {
                        type: "string",
                        example: "Concluída"
                    }
                }
            }
        }
    }
};

module.exports = swaggerDocument