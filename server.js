const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();

    res.setHeader('Content-Type', 'text/html');

 

    let path = './views/';
    switch(req.url) {
        case '/':
            res.statusCode = 200;
            path += 'index.html';
            break;
        case '/about':
            res.statusCode = 200;
            path += 'about.html';
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break;
        default: 
            res.statusCode = 404;
            path += '404.html';
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
          console.log(err);
          res.end();  
        } else {
            
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});