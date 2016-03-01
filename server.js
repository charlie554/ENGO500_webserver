var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var port_number = server.listen(process.env.PORT || 3000);

function onRequest(request, response) {

    if( request.method == 'GET' && request.url == '/' ){
        response.writeHead(200, {"Content-Type": "text/html"});
        //Open file as readable stream, pipe stream to response object
        fs.createReadStream("./index.html").pipe(response);
    }else{
        send404Response(response);
    }

}
function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

http.createServer(onRequest).listen(port_number);
console.log("Server is now running...");