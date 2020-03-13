const express = require("express");
var path = require("path");
const cors = require("cors");

var time = new Date();

const app = express();


/**
 * needed to allow requests from another port
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //just for testing if server is started up
app.get('/api/customers', (req,res)=>{
    const customers = [
        { id: 1, firstName: 'MArv', lastName: 'Bitter'},
        { id: 2, firstName: 'MArv', lastName: 'Bitter'},
        { id: 3, firstName: 'MArv', lastName: 'Bitter'}
    ]
    res.json(customers);
});

app.get('/api/src/assets/geojsonFiles/world.geojson', (req,res)=>{
    console.log("response -----",res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'world.geojson'));
});

app.get('/api/src/assets/geojsonFiles/bundeslaender.geojson', (req,res)=>{
    console.log("response-----", res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'bundeslaender.geojson'));
});

app.get('/api/src/assets/geojsonFiles/european-union-countries.geojson', (req,res)=>{
    console.log("response-----", res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'european-union-countries.geojson'));
});
app.get('/api/src/assets/geojsonFiles/landkreise-in-germany.geojson', (req,res)=>{
    console.log("response-----", res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'landkreise-in-germany.geojson'));
});
const port = 5005;


/**
 * server running on port 5005...
 */
app.listen(port, ()=> console.log(time, `server running on port:${port}`));