var http = require("http");
var fs = require("fs");

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
	console.log('yay');
      fs.readFile('./css/layouts/marketing.css', function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });
    }

     else if( request.url== '/img/common/file-icons.png' ){ //req.url has the pathname, check if it conatins '.png'
      fs.readFile('./img/common/file-icons.png', function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'image/png'});
        response.write(data);
        response.end();
      });
    }

    else if( request.url== '/img/common/grouppic.jpg' ){ //req.url has the pathname, check if it conatins '.png'
     fs.readFile('./img/common/grouppic.jpg', function (err, data) {
       if (err) console.log(err);
       response.writeHead(200, {'Content-Type': 'image/jpg'});
       response.write(data);
       response.end();
     });
   }

   else if( request.url== '/img/common/uofc.jpg' ){ //req.url has the pathname, check if it conatins '.png'
    fs.readFile('./img/common/uofc.jpg', function (err, data) {
      if (err) console.log(err);
      response.writeHead(200, {'Content-Type': 'image/jpg'});
      response.write(data);
      response.end();
    });
  }

    else{
        send404Response(response);
    }

}


http.createServer(onRequest).listen(/*process.env.PORT || 3000*/ 8888);
console.log("Server is now running...");


//---------------------
var request = require('request');

function get(id,filename,place)
{
  // Set the headers
  var headers = {
    'St-P-Access-Token':'78cc7eb2-9394-4675-b231-ff0a377a3674',
    'Content-Type':     'application/json'
  }

  // Configure the request
  var options = {
    url: 'http://pg-api.sensorup.com/st-playground/proxy/v1.0/Datastreams('+id+')/Observations',
    method: 'GET',
    headers: headers,
    qs: {'key1': 'xxx', 'key2': 'yyy'}
  }

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      //--------------
      //**************
      var obj = JSON.parse(body);
      var len = obj.value.length;
      var save = obj.value[len-1]
      save.Location = place;
      console.log(save);
      var fs = require('fs');
      fs.writeFile('./'+filename, JSON.stringify(save), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }
  })
}
var express = require('express')
var app = express();

app.locals.tempdata = require('./temps1.json');

get('249156','temps1.json','ENE333');
