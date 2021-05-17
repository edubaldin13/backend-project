const express = require("express");
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index.ejs');
})
require('./src/app/controllers/index')(app);

app.listen(3333, () => {
    console.log('Server On');
})
