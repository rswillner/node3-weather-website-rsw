const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const coordinates = (latitude + "," + longitude);
    const url = "http://api.weatherstack.com/current?access_key=fbf878319836ae6f07cefa0a97097560&query=" + coordinates + "&units=f";
    
    request({ url: url, json: true }, (error, { body } = {}) => {    // replaced response with { body } - destructured object

        if (error) {
            callback("Weather service is unavailable or unreachable", undefined);
        } else if (body.error) {    //removed response
            callback("Weather service did not return any results for your query", undefined);
        } else {
            const temperature = body.current.temperature;   //removed response
            const precip = body.current.precip;   //removed response
            callback(undefined, (body.current.weather_descriptions[0] + '. It is currently ' + temperature + ' degress out. There is a ' + precip + '% chance of rain.' +
                ' The humidity today is ' + body.current.humidity + '%.'));
        }
    });
};

module.exports = forecast;
