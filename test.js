var fs = require('fs');
var parseString = require('xml2js');
var util = require('util');

var parser = new parseString.Parser();

var xml = fs.readFile(__dirname + '/obs_sites.kml', function(err, data){
  parser.parseString(data, function (err, result){
    fs.writeFile('locationsJson.json', JSON.stringify(result), function (err){
      if (err) throw err;
      console.log('Saved!');
    })
  });
});
