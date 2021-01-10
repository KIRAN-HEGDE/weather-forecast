const express = require('express');
const path = require('path');
const https = require('https');
const app = express();
const bodyParser = require("body-parser");
const { rejects } = require('assert');
require('dotenv').config();
const querystring = require('querystring');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});



app.post('/location', (req, response) => {
    console.log('posted the location: ', req.body.search_query);
    let data0 = "";

    var options = {
        host :  'api.openweathermap.org',
        port : 443,
        path : `/data/2.5/weather?q=${ querystring.escape(req.body.search_query) }&appid=${ process.env.API_KEY }`,
        method : 'GET',
        json: true
    }

    var getReq = https.request(options,function(res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function(data) {
            data0 += data;
            console.log(data0);
        });
        res.on('end', function()  {
            let data = JSON.parse(data0)
            if (data.message) {
                console.log('insdie notFound');
                response.render('notFound', {
                    message: data.message
                })
            } else {
                response.render('location', {
                    query: req.body.search_query,
                    data: data
                })
            }
        })
        
    
    });
 
    //end the request
    getReq.end(
        
    );
    getReq.on('error', function(err){
        console.log("Error: ", err);
    });
    
    
    
});



app.listen(5000, () => {
    console.log('Server started on ', 5000)
});