const path = require('path');
const fs = require('fs');
const finalPath = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(finalPath, 'utf8');
readableStream.on('data', chunk => console.log(chunk));