const axios = require("axios");

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

module.exports = {
    consultarApod
}