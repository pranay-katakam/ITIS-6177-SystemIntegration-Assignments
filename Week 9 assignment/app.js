const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();
const app = express();

let port = 3000;
let host = 'localhost';

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/say', (req, res) => {

    let keyword = { keyword: req.query.keyword };
    AWS.config.update({ accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey, region: process.env.region });
    var lambda = new AWS.Lambda();
    var params = {
        FunctionName: 'ssdiAssignment9Function',
        Payload: JSON.stringify(keyword),
    };
    lambda.invoke(params, function (err, data) {
        if (err) res.send(err, err.stack); // an error occurred
        else res.send(data.Payload);           // successful response
    });
})

app.get('/',(req, res)=>{
    console.log("Hello world!");
    res.send("Hello world!");
})

app.listen(port, host, () => {
    console.log(`Server is running on port ${port}`);
})