const axios = require("axios");
const { response } = require("express");

const consultarApod = async (data) => {
    const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
    const parametros = {
        api_key: apiKey
    }
    if (date) {
        parametros.date = date;
    }
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: parametros,
        timeout: 5000
    })
};

const dados = response.data;

return {
    date: dados.date,
    title: dados.title,
    explanation: dados.explanation,
    media_type: dados.media_type,
    url: dados.url,
    hdurl: dados.hdurl,
    copyright: dados.copyright
}

module.exports = {
    consultarApod
};