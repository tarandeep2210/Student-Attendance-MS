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

console.log(findDistanceInMeters(12.939888,77.627011,12.939888,77.626975));

function findDistanceInMeters(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344 * 1000;
	
		return dist;
	}
}


app.listen(3000, () =>{
    console.log('Server is running at port 3000');
});