var express = require('express');
var router  = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "remotemysql.com",
    database : "eKTANlsxJA",
    user: "eKTANlsxJA",
    password: "eG9mIll7KZ"
  });

router.post('/register', (req,res) =>{
    var today = new Date();
  var students={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email_id":req.body.email,
    "mobile_no":req.body.mobile,
    "password":req.body.password,
  }
  con.query('INSERT INTO student SET ?',students, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
});

router.post('/login', async (req,res) => {
    console.log(req.body);
    var email= req.body.email;
    var password = req.body.password;
    var type = req.body.type;
    if(type==="student"){
        con.query('SELECT * FROM student WHERE email_id = ?',[email], function (error, results, fields) {
            if (error) {
              // console.log("error ocurred",error);
              res.send({
                "code":400,
                "failed":"error ocurred"
              })
            }else{
              // console.log('The solution is: ', results);
              if(results.length >0){
                if(results[0].password == password){
                  res.send({
                    "code":200,
                    "success":"login sucessfull"
                      });
                }
                else{
                  res.send({
                    "code":204,
                    "success":"Email and password does not match"
                      });
                }
              }
              else{
                res.send({
                  "code":204,
                  "success":"Email does not exits"
                    });
              }
            }
            });
    }
    else{
        con.query('SELECT * FROM teacher WHERE email_id = ?',[email], function (error, results, fields) {
            if (error) {
              // console.log("error ocurred",error);
              res.send({
                "code":400,
                "failed":"error ocurred"
              })
            }else{
              // console.log('The solution is: ', results);
              if(results.length >0){
                if(results[0].password == password){
                  res.send({
                    "code":200,
                    "success":"login sucessfull"
                      });
                }
                else{
                  res.send({
                    "code":204,
                    "success":"Email and password does not match"
                      });
                }
              }
              else{
                res.send({
                  "code":204,
                  "success":"Email does not exits"
                    });
              }
            }
            });
    }
    
})

var auth = {
    router 
}

module.exports = auth;