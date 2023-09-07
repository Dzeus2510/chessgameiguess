const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(req, res){
    res.writeHead(200, {'ContentType': 'text/html'});

    fs.readFile('nodelearning/index.html', function(err, data){
        if(err){
            res.writeHead(404);
            res.write('Error: File not Found');
        } else {
            res.write(data);
        }
        res.end();
    })
});

server.listen(port, function(err){
    if(err){
        console.log('Server died somehow', err);
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
