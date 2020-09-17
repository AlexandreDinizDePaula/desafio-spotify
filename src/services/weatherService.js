const axios = require('axios');

const api = axios.create({
    baseURL: 'https://samples.openweathermap.org/data/2.5'
})

module.exports = api
