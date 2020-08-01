const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VkaGEyMzEwIiwiYSI6ImNrZGE3N2QzNTFiODQycXNjcjNjYmU0eXcifQ.osOwjbKbQnlsKKkKHJbtdg&limit=1';
    request({url, json:true}, (error,{body}={}) =>{
            if(error){
                callback('Unable to connect to location services',undefined);
            }else if(body.features.length === 0){
                callback('Unable to find a location. Try it again',undefined);
            }else{
                callback(undefined,{
                    longitude : body.features[0].center[0],
                    latitude : body.features[0].center[1],
                    location : body.features[0].place_name
                });
            }
    });
};


module.exports = geoCode;