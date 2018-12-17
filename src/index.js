const express =require('express');
const app = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const gvi = require("./gvi.js");
app.get('/', function (req,res){
    res.send("hey there")
})
app.post('/gvi', jsonParser, function (req, res) {
    console.log(`Received a tagging from ${req.body.userName} for video ${req.body.fileName}`)
    gvi.analyzeLabel(req.body).then( (tags) => {
        console.log('waited for results and posted tags to xchange')
        res.send(tags.toString().replace(/,/g, ` - `))
    })
})
port = 5000
app.listen(port, () => console.log(`listening on ${port}`))