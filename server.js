const express = require("express");
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index.ejs');
})
require('./src/controllers/authController')(app);
app.post('/show', (req, res) => {
    console.log(req.body);
})

app.listen(3333, () => {
    console.log('Server On');
})
