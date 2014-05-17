var express = require('express'),
    app = express(),
    unirest = require('unirest'),
    dotenv = require('dotenv');

dotenv.load();

var mashapeTestingKey = process.env.MASHAPE_TESTING_KEY;

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.post('/say/something', function(req, res) {
  var something = req.body.say;

  console.log(mashapeTestingKey);


  var input = 'https://jeannie.p.mashape.com/text/?input=' + something + '&locale=en&location=50.3%2C9.0&clientFeatures=all&timeZone=%2B120&out=simple%2Fjson';

  var Request = unirest.get(input)
    .headers({ 
      "X-Mashape-Authorization": mashapeTestingKey
  })
  .end(function (response) {
    res.send(response.body);
  });
});

app.post('/yoda/translate', function(req, res) {
  var something = req.body.say;

  var input = 'https://yoda.p.mashape.com/yoda?sentence=' + something;

  var Request = unirest.get(input)
    .headers({ 
      "X-Mashape-Authorization": process.env.MASHAPE_TESTING_KEY
  })
  .end(function (response) {
    res.send(response.body);
  });
});

app.get('*',function(req,res){
  res.sendfile('public/static/index.html');
});

var server = app.listen(3000, function() {
  console.log('listening on port %d', server.address().port);
});
