var express = require('express');
var app = express();
var cors = require('cors');


app.use(cors());

app.get('/users',(req,res)=>{
    res.send('users');
});


app.listen(3000, () =>{
    console.log('Server is running at port 3000');
});