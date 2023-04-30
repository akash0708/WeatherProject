const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
require('dotenv').config();

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    
    res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req, res){

    console.log(req.body.cityName)

    const appid = process.env.APP_ID;
    const query = req.body.cityName;
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appid+"&q="+ query+"&units="+unit

    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description
            
            const imgUrl = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"

            res.write("<h1>The temperature in "+query+" is "+temp+" degree Celcius</h1>")
            res.write("<h1>The weather is currently "+description+"</h1>")
            res.write("<img src="+imgUrl+">")
            res.send()

        })
    })
})


app.listen(3000, function(req, res){
    console.log("your server is running on port 3000")
})