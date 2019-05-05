const request = require('request');

if (!process.env.FORECAST_KEY) {
    require('dotenv').config();
}

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.FORECAST_KEY}/${lat},${lng}?units=si&lang=nl`;

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