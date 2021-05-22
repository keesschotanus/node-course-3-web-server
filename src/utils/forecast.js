const request = require('postman-request');

if (!process.env.FORECAST_KEY) {
    require('dotenv').config();
}

const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_KEY}&query=${lat},${lng}`;

    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Weather Service!');
        } else if (body.error) {
            callback('Unable to find location.');
        } else {
            callback(undefined, body);
        }
    });
}

module.exports = forecast;