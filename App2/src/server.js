const express = require('express');

const app = express();
const path = require('path');
const fs = require('fs');

app.use('/', express.static(path.resolve(__dirname, '../dist')))

app.get('/', function (req, res) {
    const pathToHtml = path.resolve(__dirname, '../dist/index.html')
    const contentFromFile = fs.readFileSync(pathToHtml, 'utf-8');
    res.send(contentFromFile);
});

app.listen(9001, function () {
    console.log('Application is running on http://localhost:9001/')
})