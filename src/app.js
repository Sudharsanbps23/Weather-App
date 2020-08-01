const path = require('path');
const express = require("express");
const app = express();
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;
//Define path for express config
const public = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//hbs engine and view location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to use
app.use(express.static(public));

app.get('/',(req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Sudharsan'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Sudharsan'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        message : "Contact us for any queries..",
        title : "Help",
        name : "Sudha"
    });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error : "You Must provide an address"
    });
  }

  geoCode(req.query.address,(error, {longitude,latitude,location}={})=>{
    if(error){
      return res.send({ error });
    }

      forecast(longitude,latitude, (error, forecastData) => {
        if(error){
          return res.send({ error });
        }

        res.send({
          forecast : forecastData,
          location,
          address : req.query.address
        });
      });
    
  });
});


app.get('*',(req, res) => {
    res.render('404',{
        title : "404",
        name : "Sudharsan",
        errorMessage : "Page not found"
    });
});

app.listen(port, () => {
  console.log("Server listening on Port " + port);
});
