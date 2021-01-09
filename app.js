const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const { rejects } = require('assert');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

app.post('/location', (req, res) => {
    console.log('posted the location: ', req.body);
    res.render('location');
});



app.listen(5000, () => {
    console.log('Server started on ', 5000)
});