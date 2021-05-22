const request = require('postman-request');

if (!process.env.FORECAST_KEY) {
    require('dotenv').config();
}

debugger
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.GEOCODE_KEY}&limit=1`;

    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Geo Location Service!');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another address.');
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    });
}

module.exports = geocode;