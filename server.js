const express = require("express");
const app = express();

app.get('/', (req,res)=>{
    res.send('Time');
})
app.post('/',(req,res)=>{
    res.send('Post request to the homepage');
})
app.listen(3333,()=>{
    console.log('Server On');
})