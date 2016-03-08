var http = require("http");
var fs = require("fs");
var port_number = process.env.PORT || 3000;

//We will send them a 404 response if page doesn't exist
function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

//Handle their request
function onRequest(request, response) {
	console.log(request.url);
	console.log(request.url.indexOf('.html'));

    if( request.method == 'GET' && request.url == '/' ){
        response.writeHead(200, {"Content-Type": "text/html"});
        //Open file as readable stream, pipe stream to response object
        fs.createReadStream("./index.html").pipe(response);
    }

    else if( request.url== '/css/layouts/marketing.css' ){ //req.url has the pathname, check if it conatins '.css'
      fs.readFile('./css/layouts/marketing.css', function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });
    }

    else{
        send404Response(response);
    }

}


http.createServer(onRequest).listen(port_number);
console.log("Server is now running...");

//For 404 - http://localhost:8888/cornbacon