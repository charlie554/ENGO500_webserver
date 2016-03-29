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

function get(id,filename,index)
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
      }
      else
      {
        fs.appendFile('./'+filename+'.js',filename+'.push([\'unavailable\','+index+'])\n', function(err) {
          if(err)
          {
            return console.log(err);
          }
        });
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
      });
    }
  })
}
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//BEGIN FILTHY SECTION
function dlData()
{
  //-------------------------------------------------------------------------------------------------------------------------------
  //Temperatures
  fs.writeFile('./data1.js', "var data1 = []\n", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('258944','data1','0');
  get('263929','data1','1')
  get('263935','data1','2')
  get('263941','data1','3')
  get('263947','data1','4')
  get('263953','data1','5')
  get('263959','data1','6')
  get('263965','data1','7')
  get('263971','data1','8')
  get('263977','data1','9')
  get('263983','data1','10')
  get('263989','data1','11')
  get('264007','data1','12')
  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Download Speeds
  fs.writeFile('./data2.js', "var data2 = []\n", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('259343','data2','0')
  get('264019','data2','1')
  get('264025','data2','2')
  get('264031','data2','3')
  get('264037','data2','4')
  get('264043','data2','5')
  get('264049','data2','6')
  get('264055','data2','7')
  get('264061','data2','8')
  get('264067','data2','9')
  get('264073','data2','10')
  get('264079','data2','11')
  get('264085','data2','12')

  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Upload Speeds
  fs.writeFile('./data3.js', "var data3 = []\n", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('259349','data3','0')
  get('264109','data3','1')
  get('264115','data3','2')
  get('264121','data3','3')
  get('264127','data3','4')
  get('264133','data3','5')
  get('264139','data3','6')
  get('264145','data3','7')
  get('264151','data3','8')
  get('264157','data3','9')
  get('264163','data3','10')
  get('264169','data3','11')
  get('264175','data3','12')
  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Dust
  fs.writeFile('./data4.js', "var data4 = []\n", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('263799','data4','0')
  get('264295','data4','1')
  get('264301','data4','2')
  get('264307','data4','3')
  get('264313','data4','4')
  get('264319','data4','5')
  get('264325','data4','6')
  get('264331','data4','7')
  get('264337','data4','8')
  get('264343','data4','9')
  get('264349','data4','10')
  get('264355','data4','11')
  get('264361','data4','12')
  //-------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------
  //Noise
  fs.writeFile('./data5.js', "var data5 = []\n", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("variable declared");
  });
  get('263824','data5','0')
  get('264199','data5','1')
  get('264205','data5','2')
  get('264211','data5','3')
  get('264217','data5','4')
  get('264223','data5','5')
  get('264229','data5','6')
  get('264240','data5','7')
  get('264247','data5','8')
  get('264253','data5','9')
  get('264259','data5','10')
  get('264265','data5','11')
  get('264271','data5','12')
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
    'St-P-Access-Token':'b1937bfb-c9fc-41e9-ae19-1b455f7a9443',
    'Content-Type':     'application/json'
  }

  // Configure the request
  var options = {
    url: 'http://pg-api.sensorup.com/st-playground/proxy/v1.0/Datastreams(258944)/Observations',
    method: 'GET',
    headers: headers,
    qs: {'key1': 'xxx', 'key2': 'yyy'}
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
