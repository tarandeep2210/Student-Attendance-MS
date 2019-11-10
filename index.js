var express = require('express');
var app = express();
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var auth = require('./auth');

app.use(cors());
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "remotemysql.com",
    database : "eKTANlsxJA",
    user: "eKTANlsxJA",
    password: "eG9mIll7KZ"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

//endpoints  

app.get('/students',async (req,res)=>{
    
   await con.query("SELECT * FROM student", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
      
});

app.use('/auth' , auth.router);


app.listen(3000, () =>{
    console.log('Server is running at port 3000');
});