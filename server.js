var http = require("http");
var fs = require("fs");
var path = require('path')


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
  //console.log(fs.existsSync(request.url))
  //console.log(request.url.indexOf('.html'));
  //console.log(path.dirname(request.url));
  //console.log(path.basename(request.url));
  //console.log(path.extname(request.url));

  if( request.method == 'GET' && request.url == '/' )
  {
    response.writeHead(200, {"Content-Type": "text/html"});
    //Open file as readable stream, pipe stream to response object
    fs.createReadStream("./index.html").pipe(response);
  }

  else if(fs.existsSync('.'+request.url))
  {

    if( path.extname(request.url)== '.css')
    {
      fs.readFile('.'+request.url, function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });
    }
    else if( path.extname(request.url)== '.png')
    {
      fs.readFile('.'+request.url, function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'image/png'});
        response.write(data);
        response.end();
      });
    }
    else if( path.extname(request.url)== '.jpg' )
    {
      fs.readFile('.'+request.url, function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(data);
        response.end();
      });
    }
    /*else if( path.extname(request.url)== '.js' )
    {
      fs.readFile('.'+request.url, function (err, data) {
        if (err) console.log(err);
        response.setHeader('Content-Type', 'application/javascript');
        response.end(data);
      });
    }*/
    else if( request.url== '/data1.js' )
    {
     fs.readFile('./data1.js', function (err, data) {
       if (err) console.log(err);
       response.setHeader('Content-Type', 'application/javascript');
       response.end(data);
       //response.end();
     });
    }
    else if( request.url== '/data2.js' )
    {
     fs.readFile('./data2.js', function (err, data) {
       if (err) console.log(err);
       response.setHeader('Content-Type', 'application/javascript');
       response.end(data);
       //response.end();
     });
    }
    else if( request.url== '/data3.js' )
    {
     fs.readFile('./data3.js', function (err, data) {
       if (err) console.log(err);
       response.setHeader('Content-Type', 'application/javascript');
       response.end(data);
       //response.end();
     });
    }
    else if( request.url== '/data4.js' )
    {
     fs.readFile('./data4.js', function (err, data) {
       if (err) console.log(err);
       response.setHeader('Content-Type', 'application/javascript');
       response.end(data);
       //response.end();
     });
    }
    else if( request.url== '/data5.js' )
    {
     fs.readFile('./data5.js', function (err, data) {
       if (err) console.log(err);
       response.setHeader('Content-Type', 'application/javascript');
       response.end(data);
       //response.end();
     });
    }
  }
  else
  {
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
var fs = require('fs');

function get(id,filename,index,callback)
{
  console.log("Connecting to PG-API")
  // Set the headers
  var headers = {
    'Content-Type':     'application/json'
  }

  // Configure the request
  var options = {
    url: 'http://chashuhotpot.sensorup.com/OGCSensorThings/v1.0/Datastreams('+id+')/Observations',
    method: 'GET',
    headers: headers,
  //  qs: {'key1': 'xxx', 'key2': 'yyy'}
  }

  // Start the request
  request(options, function (error, response, body)
  {
    if (!error && response.statusCode == 200)
    {
      // Print out the response body
      //--------------
      //**************
      var obj = JSON.parse(body);
      var len = obj.value.length;
      var save = obj.value[0]
      //save.Location = place;
      if ( save !== 'undefined' && save)
      {
        fs.appendFile('./'+filename+'.js',filename+'.push(['+JSON.stringify(save.result)+','+index+'])\n', function(err) {
          if(err)
          {
            return console.log(err);
          }
          console.log(save.result);
        });
        callback()
      }
      else
      {
        fs.appendFile('./'+filename+'.js',filename+'.push([\'unavailable\','+index+'])\n', function(err) {
          if(err)
          {
            return console.log(err);
          }
        });
        callback()
      }
    }
    else
    {
      console.log("error Connecting to server");
      fs.appendFile('./'+filename+'.js',filename+'.push([\'unavailable\','+index+'])\n', function(err) {
        if(err)
        {
          return console.log(err);
        }
        callback()
      });
    }
  })
}
var futures = require('futures');
var sequence = futures.sequence();
var async = require('async')
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//BEGIN FILTHY SECTION
function dlData()
{
//callback hell
  //-------------------------------------------------------------------------------------------------------------------------------
  async.series([
  //Temperatures
  function(callback){fs.writeFile('./data1.js', "var data1 = []\n", function(err) {
    if(err) {
      return console.log(err);
    }
    callback();
    console.log("variable declared");
  })},
    function(callback){get('1701160','data1','0',callback)},
    function(callback){get('1701161','data1','1',callback)},
    function(callback){get('1701162','data1','2',callback)},
    function(callback){get('1701164','data1','3',callback)},
    function(callback){get('1701165','data1','4',callback)},
    function(callback){get('1701167','data1','5',callback)},
    function(callback){get('1701168','data1','6',callback)},
    function(callback){get('1701170','data1','7',callback)},
    function(callback){get('1701171','data1','8',callback)},
    function(callback){get('1701172','data1','9',callback)},
    function(callback){get('1701174','data1','10',callback)},
    function(callback){get('1701175','data1','11',callback)},
    function(callback){get('1701177','data1','12',callback)},


  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Download Speeds
  function(callback){fs.writeFile('./data2.js', "var data2 = []\n", function(err) {
    if(err) {
      callback()
      return console.log(err);
    }
    callback()
    console.log("variable declared");
  })},
  function(callback){get('1701212','data2','0',callback)},
  function(callback){get('1701213','data2','1',callback)},
  function(callback){get('1701215','data2','2',callback)},
  function(callback){get('1701217','data2','3',callback)},
  function(callback){get('1701218','data2','4',callback)},
  function(callback){get('1701219','data2','5',callback)},
  function(callback){get('1701221','data2','6',callback)},
  function(callback){get('1701222','data2','7',callback)},
  function(callback){get('1701223','data2','8',callback)},
  function(callback){get('1701225','data2','9',callback)},
  function(callback){get('1701226','data2','10',callback)},
  function(callback){get('1701228','data2','11',callback)},
  function(callback){get('1701229','data2','12',callback)},


  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Upload Speeds
  function(callback){fs.writeFile('./data3.js', "var data3 = []\n", function(err) {
    if(err) {
      callback()
      return console.log(err);
    }
    console.log("variable declared");
    callback()
  })},
  function(callback){get('1701263','data3','0',callback)},
  function(callback){get('1701265','data3','1',callback)},
  function(callback){get('1701266','data3','2',callback)},
  function(callback){get('1701267','data3','3',callback)},
  function(callback){get('1701269','data3','4',callback)},
  function(callback){get('1701270','data3','5',callback)},
  function(callback){get('1701271','data3','6',callback)},
  function(callback){get('1701273','data3','7',callback)},
  function(callback){get('1701274','data3','8',callback)},
  function(callback){get('1701275','data3','9',callback)},
  function(callback){get('1701277','data3','10',callback)},
  function(callback){get('1701278','data3','11',callback)},
  function(callback){get('1701279','data3','12',callback)},
  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Dust
  function(callback){fs.writeFile('./data5.js', "var data5 = []\n", function(err) {
    if(err) {
      callback()
      return console.log(err);
    }
    console.log("variable declared");
    callback()
  })},
  function(callback){get('1701316','data5','1',callback)},
  function(callback){get('1701317','data5','2',callback)},
  function(callback){get('1701319','data5','3',callback)},
  function(callback){get('1701320','data5','4',callback)},
  function(callback){get('1701321','data5','5',callback)},
  function(callback){get('1701323','data5','6',callback)},
  function(callback){get('1701324','data5','7',callback)},
  function(callback){get('1701325','data5','8',callback)},
  function(callback){get('1701327','data5','9',callback)},
  function(callback){get('1701328','data5','10',callback)},
  function(callback){get('1701329','data5','11',callback)},
  function(callback){get('1701330','data5','12',callback)},
  function(callback){get('1701332','data5','13',callback)},

  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Noise
  function(callback){fs.writeFile('./data4.js', "var data4 = []\n", function(err) {
    if(err) {
      callback()
      return console.log(err);
    }
    callback()
    console.log("variable declared");
  })},
  function(callback){get('1701366','data4','0',callback)},
  function(callback){get('1701367','data4','1',callback)},
  function(callback){get('1701369','data4','2',callback)},
  function(callback){get('1701370','data4','3',callback)},
  function(callback){get('1701371','data4','4',callback)},
  function(callback){get('1701373','data4','5',callback)},
  function(callback){get('1701374','data4','6',callback)},
  function(callback){get('1701376','data4','7',callback)},
  function(callback){get('1701377','data4','8',callback)},
  function(callback){get('1701378','data4','9',callback)},
  function(callback){get('1701380','data4','10',callback)},
  function(callback){get('1701381','data4','11',callback)},
  function(callback){get('1701382','data4','12',callback)},

]);
}


var express = require('express')
var app = express();
//app.locals.tempdata = require('./data1.js');

getData();

//----------------------------------------------------------------
//dirty loop
var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
  getData();
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

function getData()
{
  console.log("Connecting to PG-API")
  // Set the headers
  var headers = {
    'Content-Type':     'application/json'
  }

  // Configure the request
  var options = {
    url: 'http://chashuhotpot.sensorup.com/OGCSensorThings/v1.0/Datastreams(1701382)/Observations',
    method: 'GET',
    headers: headers,
    //qs: {'key1': 'xxx', 'key2': 'yyy'}
  }

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200)
    {
      dlData();
    }
    else
    {
      console.log("error Connecting to server, not updating, server possibly dead");
    }
  })
}
