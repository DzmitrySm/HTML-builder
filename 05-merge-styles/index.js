const fs = require('fs');
const path = require('path');
const finalPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const writableToFile = fs.createWriteStream(bundlePath);


fs.readdir(path.join(finalPath), (err, data) => {  
  if (err) {
    console.log(err);
    return;
  }
  
  let filtArr = data.filter(file => (path.extname(file) === '.css'));
  let arr = [];
  let bundleArr = [];
  for(let i = 0; i < filtArr.length; i++) { 
    
    fs.stat(path.join(__dirname, 'styles', filtArr[i]), (err, stats) => {
      
     
      if (err) throw err;
      
      if (stats.isFile()) {
        
        arr.push(filtArr[i]);

      } 

      if (i === filtArr.length - 1) {
      for (let j = 0; j < arr.length; j++) {
        fs.readFile(path.join(finalPath, arr[j]), (err, data) => {  
          if (err) {
            console.log(err);
            return;
          }
          const readableStream = fs.createReadStream(path.join(finalPath, arr[j]), 'utf8');
          readableStream.on('data', chunk => data = data + chunk)
          readableStream.on('data', chunk => writableToFile.write(chunk));
            
        })
        

      }
    }

  })

}

})
      

   

  
  
  
