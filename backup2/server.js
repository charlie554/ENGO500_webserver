var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var port_number = process.env.PORT || 3000;

function onRequest(request, response) {

    if( request.method == 'GET' && request.url == '/' ){
        response.writeHead(200, {"Content-Type": "text/html"});
        //Open file as readable stream, pipe stream to response object
        fs.createReadStream("./thisisourwebsite.html").pipe(response);
    }else{
        send404Response(response);
    }

}
function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

http.get('pg-api.sensorup.com/st-playground/proxy/v1.0/Datastreams(249162)/Observations', {
    headers: {'St-P-Access-Token': '78cc7eb2-9394-4675-b231-ff0a377a3674'}
});


http.createServer(onRequest).listen(port_number);
console.log("Server is now running...");

console.log(http.get('pg-api.sensorup.com/st-playground/proxy/v1.0/Datastreams(249162)/Observations', {
    headers: {'St-P-Access-Token': '78cc7eb2-9394-4675-b231-ff0a377a3674'}
}))