function(callback){
  fs.readFile('./dataa.js', 'ascii', function (err,data) {
    if (err) {
      callback()
      return console.log(err);
    }
    fs.writeFile('./data1.js', data , function(err) {
      if(err) {
        callback()
        return console.log(err);
      }
    })
  });
  callback()
}
