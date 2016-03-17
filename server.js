var http = require("http");
var fs = require("fs");

//We will send them a 404 response if page doesn't exist
function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

//begin brute force responses
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

  else if( request.url== '/img/common/geo.png' ){ //req.url has the pathname, check if it conatins '.png'
   fs.readFile('./img/common/geo.png', function (err, data) {
     if (err) console.log(err);
     response.writeHead(200, {'Content-Type': 'image/png'});
     response.write(data);
     response.end();
   });
 }


  ///img/common/geo.png

  else if( request.url== '/data1.js' ){ //req.url has the pathname, check if it conatins '.png'
   fs.readFile('./data1.js', function (err, data) {
     if (err) console.log(err);
     response.setHeader('Content-Type', 'application/javascript');
     response.end(data);
     //response.end();
   });
 }

 else if( request.url== '/data2.js' ){ //req.url has the pathname, check if it conatins '.png'
  fs.readFile('./data2.js', function (err, data) {
    if (err) console.log(err);
    response.setHeader('Content-Type', 'application/javascript');
    response.end(data);
    //response.end();
  });
 }
 else if( request.url== '/data3.js' ){ //req.url has the pathname, check if it conatins '.png'
  fs.readFile('./data3.js', function (err, data) {
    if (err) console.log(err);
    response.setHeader('Content-Type', 'application/javascript');
    response.end(data);
    //response.end();
  });
 }

    else{
        send404Response(response);
    }

}
//end brute force responses

//running server, 8888 if runnin on personal computer, process.env.PORT || 3000 for heroku
http.createServer(onRequest).listen(process.env.PORT || 3000);
console.log("Server is now running...");

//get gets stuff from pg-sensorthings given stream id
//---------------------
var request = require('request');

function get(id,filename,place)
{
  console.log("Connecting to PG-API")
  // Set the headers
  var headers = {
    'St-P-Access-Token':'b1937bfb-c9fc-41e9-ae19-1b455f7a9443',
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
      var save = obj.value[0]
      //save.Location = place;
      console.log(save);
      var fs = require('fs');
      fs.appendFile('./'+filename,JSON.stringify(save), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }
    else {
      console.log("error Connecting to server");
    }
  })
}
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//BEGIN FILTHY SECTION
//-------------------------------------------------------------------------------------------------------------------------------
//Temperatures
fs.writeFile('./data1.js', "var data1 = ", function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("variable declared");
});
get('258944','data1.js','ENE333');

//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//Download Speeds
fs.writeFile('./data2.js', "var data2 = ", function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("variable declared");
});
get('259343','data2.js','ENE333');

//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//Upload Speeds
fs.writeFile('./data3.js', "var data3 = ", function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("variable declared");
});
get('259349','data3.js','ENE333');

var express = require('express')
var app = express();
//app.locals.tempdata = require('./data1.js');



//----------------------------------------------------------------
//dirty loop
var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
  //Temperatures
  fs.writeFile('./data1.js', "var data1 = ", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('258944','data1.js','ENE333');

  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Download Speeds
  fs.writeFile('./data2.js', "var data2 = ", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('259343','data2.js','ENE333');

  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Upload Speeds
  fs.writeFile('./data3.js', "var data3 = ", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('259349','data3.js','ENE333');

  var express = require('express')
  var app = express();
  console.log("I am doing my 5 minutes check");
  // do your stuff here
}, the_interval);

//END DIRTY LOOP
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//END FILTHY SECTION
