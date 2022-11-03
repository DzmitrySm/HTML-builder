const fs = require('fs');
const path = require('path');
const finalPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

fs.readdir(path.join(copyPath), (err, items) => {
  if (err) {
    return;
  } 
  if (items) {
    items.forEach(file => {
      fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
              
        if (err) {
          console.log(err) ; 
          
        }
      });
  
    });
  }
});

    
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if(err) throw err;

  console.log('Папка успешно создана');
  
});

fs.readdir(path.join(finalPath), (err, data) => {
  if (err)
    console.log(err);
  data.forEach(file => 
    fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
            
      if (err) {
        console.log(err) ; 
      }}
            
    ));
});
