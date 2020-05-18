const request = require('request');

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1Ijoicm9iYmllODI0IiwiYSI6ImNrOXViMGs1ZjFucG4zZnJ0Mm9majJjaTQifQ.ooZZxCRLOTAKXdOaI5QysA&limit=1";
    
    request({ url: url, json: true }, (error, { body } = {}) => {     // replaced response with { body } - destructured object
        if (error) {
            callback("Geocoding service is unavailable or unreachable", undefined);
        } else if (body.features.length === 0) {    //removed response
            callback("Geocoding service did not return any results for your query", undefined);
        } else {
            console.log(body.features[0].center[1], body.features[0].center[0]);
            callback(undefined, {
                latitude: body.features[0].center[1],    //removed response
                longitude: body.features[0].center[0],   //removed response
                location: body.features[0].place_name    //removed response
            });
        }
    });
};

module.exports = geocode;