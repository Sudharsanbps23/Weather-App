const request = require('request');

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a28191d725dfee955345a517db5d4a9c&query=' + longitude + ',' + latitude + '&units=f';
    request({url,json:true},(error,{body}={}) => {
        if(error){
            callback('Unable to connect to the weather',undefined);
        }else if(body.error){
            callback('Unable to find the connection',undefined);
        }else{
            callback(undefined,
                body.current.weather_descriptions + '.It is currently ' + body.current.temperature + ' degrees out.It feels like ' + body.current.feelslike + ' degrees out. There is a '+ body.current.humidity + '% of rain');
        }
    });
};

module.exports = forecast;