const http = require("http");
const host = 'localhost';
const port = 8000;
const url = require('url');
const fs = require('fs');
/* const { FILE } = require("dns"); */
/* const app = express()
const session = require('express-session') */

 let requestMethod 
var file; 
  
 
const requestListener = function (req, res) {
     console.log(req.url);
    if(req.url==="/about"){
        res.writeHead(200);
file = fs.createReadStream('about.html')
 res.writeHead(200);
    }

     else if(req.url == "/"){ 
               requestMethod = req.method; 
  console.log(requestMethod);
           file = fs.createReadStream('index.html'); 
    }


    else if(req.url==="/contact-us"){
        res.writeHead(200);
        file = fs.createReadStream('contectus.html')
    }
else if(req.url==="/api/users"){
   res.setHeader('Content-Type', 'application/json');  
  file = fs.createReadStream("users.json")
                requestMethod = req.method; 
  console.log(requestMethod);


}
else if(url.parse(req.url).pathname==="/greeting-user"){
     const queryObject = url.parse(req.url, true).query;
    res.end(`Hi user ${queryObject.name || 'Unknown user'}`); 
    return
}

 else {
   res.writeHead(302, {'Location':'http://localhost:8000'});           
res.end();
} 
if(file){
    file.pipe(res);
}
 
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`); 
});

