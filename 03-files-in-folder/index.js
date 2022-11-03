const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), (err, data) => {
  if (err)
    console.log(err);
  else {
    data.forEach(file => {
      const regex = /\.(.*)/i;
      const nameFileWithouExt = (file.replace(regex, ''));
    
      fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if (err) throw err;
        if(stats.isFile()) {
          console.log(nameFileWithouExt + ' - ' + path.extname(file).slice(1) + ' - ' + stats.size + 'B');
        }
   
      });});}});