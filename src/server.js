const express = require("express");
var path = require("path");

const app = express();

app.get('/api/customers', (req,res)=>{
    const customers = [
        { id: 1, firstName: 'MArv', lastName: 'Bitter'},
        { id: 2, firstName: 'MArv', lastName: 'Bitter'},
        { id: 3, firstName: 'MArv', lastName: 'Bitter'}
    ]
    res.json(customers);
});

app.get('/src/assets/geojsonFiles/world.geojson', (req,res)=>{
    console.log("response -----",res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'world.geojson'));
});

app.get('/src/assets/geojsonFiles/bundeslaender.geojson', (req,res)=>{
    console.log("response-----", res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'bundeslaender.geojson'));
});

app.get('/src/assets/geojsonFiles/european-union-countries.geojson', (req,res)=>{
    console.log("response-----", res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'european-union-countries.geojson'));
});
app.get('/src/assets/geojsonFiles/landkreise-in-germany.geojson', (req,res)=>{
    console.log("response-----", res);
    res.sendFile(path.join(__dirname, '/assets/geojsonFiles', 'landkreise-in-germany.geojson'));
});
const port = 5005;

app.listen(port, ()=> console.log(`server running on port:${port}`));