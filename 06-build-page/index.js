const fs = require('fs');
const path = require('path');
const pathTemplate = path.join(__dirname, 'template.html');
const pathHeader = path.join(__dirname, 'components', 'header.html');
const pathArticles = path.join(__dirname, 'components', 'articles.html');
const pathFooter = path.join(__dirname, 'components', 'footer.html');
const readableStream = fs.createReadStream(pathTemplate, 'utf-8');
const writableToFileStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
const assetsPath = path.join(__dirname, 'assets');
const copyPath = path.join(__dirname, 'project-dist', 'assets');
fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
   const writableToFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  
});



const templateFile = readableStream.on('data', (chunk) => {
  const arrChunk = chunk.split('\r\n').map(x => x.trim());
 //console.log(chunk);
  for(let i = 0; i < arrChunk.length; i++) {
  
if (arrChunk[i] === '{{header}}') {
  const readableStreamfromHeader = fs.createReadStream(pathHeader, 'utf-8');
  readableStreamfromHeader.on('data', (chunk1) => {
    
    arrChunk[i] = chunk1; 
  
  
  
   
  
  })


}

if (arrChunk[i] === '{{articles}}') {
  const readableStreamfromArticles = fs.createReadStream(pathArticles, 'utf-8');
  readableStreamfromArticles.on('data', (chunk2) => {
    
    arrChunk[i] = chunk2; 
  
  
   
    
  
  })


}

if (arrChunk[i] === '{{footer}}') {
  const readableStreamfromFooter = fs.createReadStream(pathFooter, 'utf-8');
  readableStreamfromFooter.on('data', (chunk3) => {
    
    arrChunk[i] = chunk3; 
  
  fs.writeFile((path.join(__dirname, 'project-dist', 'index.html')), arrChunk.join('\r\n'), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
  } );

  })

  fs.readdir(path.join(__dirname, 'styles'), (err, data) => {  
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
          console.log(arr)
          console.log(filtArr)
        for (let j = 0; j < arr.length; j++) {
          const readableStream = fs.createReadStream(path.join(__dirname, 'styles', arr.sort()[j]), 'utf8');
      
          fs.readFile(path.join(__dirname, 'styles', arr.sort()[j]), (err, data) => {  
            console.log(path.join(__dirname, 'styles', arr.sort()[j]))
            console.log(data)
            if (err) {
              console.log(err);
              return
            }
            console.log(arr.sort())
            
            readableStream.on('data', chunk => data = data + chunk)
            readableStream.on('data', chunk => writableToFileStyle.write(chunk));
            readableStream.on('end', () => console.log('End')) 
          })
          
  
        }
         
      }
  
    })
  
  }
  
  })


}
fs.readdir(path.join(copyPath), (err, items) => {
  if (err) {
    return;
  } 
  if (items) {
    items.forEach(file => {
      fs.unlink(path.join(__dirname, 'project-dist', 'assets', file), (err) => {
              
        if (err) {
          console.log(err) ; 
          
        }
      });
  
    });
  }
});

    
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
  if(err) throw err;

  console.log('Папка успешно создана');
  
});

fs.readdir(path.join(assetsPath), (err, data) => {
  
  if (err)
    console.log(err);
  data.forEach(file => 
    fs.cp(path.join(__dirname, 'assets', file), path.join(__dirname, 'project-dist', 'assets', file),{ recursive: true }, (err) => {
            
      if (err) {
        console.log(err) ; 
      }
      
    }
      
            
    ));
});


  }
  
 
});




