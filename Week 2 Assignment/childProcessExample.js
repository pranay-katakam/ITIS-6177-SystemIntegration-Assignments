const { exec } = require("child_process");

const port = 8081;

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    
    exec("open .", () => {
        console.log("Hello exploring Finder !!!!! ")
    });
})

app.listen(port, () => {
    console.log(`App listening to ${port}`)
});