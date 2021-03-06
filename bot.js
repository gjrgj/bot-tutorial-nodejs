var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^cleans$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = "Sundays \nArea around Hot Tub / Front Lawn (9 pm):\nDaniel\nKetav\nSam\n\nCups(9 pm):\nAgastya\nWes\nBrian Chung\nPChow\nDeven\nHeder\nTad\nArun\nShaket\nEvan\nJmar\nChogan\n\nMops (9:30 pm):\nJuan\nDerrick\nJimmy\nPaul H.\nWeiling\nNathan\nDamian\nJake\nGeorge\nBrian Chekal\nSteven\nWyatt\n\nMake sure the lawn and area around the back door is free of all trash or we could get fined. @cups people, Don't forget to clean behind the bar and in the keg cave too. @mops people, use a FUCKTON of bleach. Those gnats need to die.";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;