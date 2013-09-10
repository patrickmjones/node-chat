var url = require('url'), path = require('path');
var connect = require('connect');

function ChatMessage(author, message) {
	this.message = message;
	this.author = author;
	this.timestamp = new Date();
}

var Messages = [];

function handleRequest (req, res) {

  var decodedURL = decodeURI(url.parse(req.url).pathname);
  var URLparts = decodedURL.split('/');
  var method = URLparts[1];
  var args = URLparts.slice(2);

  switch(method) {
    case "post":
      if(args.length == 2) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        Messages.push(new ChatMessage(args[0], args[1]));
        res.write("{status:'OK'}");
      } else {
        res.writeHead(400, {'Content-Type': 'application/json'}); 
        res.write("{status:'ERROR'}");
      }
      break;
    case "get":
        res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(Messages));
      break;
    default:
      res.writeHead(200, {'Content-Type': 'text/html'});
      for(var i = 0; i < Messages.length; i++) {
        res.write("<p>" + Messages[i].message + "</p>");
      }
      break;
  }

  res.end();
}

var app = connect()
	.use(connect.logger('dev'))
	.use(connect.static('public'))
	.use(handleRequest)
	.listen(8080);
/*
require('http')
	.createServer(handleRequest)
	.listen(8080);
*/
