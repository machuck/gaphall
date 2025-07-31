const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static(__dirname));

const options = {
  key: fs.readFileSync('localhost+2-key.pem'),
  cert: fs.readFileSync('localhost+2.pem')
};

https.createServer(options, app).listen(8080, '0.0.0.0', () => {
  console.log('HTTPS Server running on https://localhost:8080');
  console.log('Access from iPhone: https://192.168.211.129:8080');
});
