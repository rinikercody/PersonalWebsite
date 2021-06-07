const http = require('http');
const fs = require('fs');
var path = require('path');

const PORT = 80;

function handleRequest(req,res){
	if(req.url == '/server.js' || req.url == '/Logs/log.txt'){
		res.statusCode = 404;
		res.end('File not found');
	}
	else{
		if(req.method === 'GET'){
			if(req.url === '/'){
				var date = new Date();
				var str = ':) Someone visited the site on: ' + getLocalTimeString(date) + '\r\n';
				fs.appendFileSync(path.join('Logs','log.txt'),str);
				serveFile('index.html',res);
			}
			else{
				serveFile(req.url.substring(1),res); //cut of / on request
			}
		}
		if(req.method === 'POST'){
			var date = new Date();
			var str = 'IP: ' + req.connection.remoteAddress + ' made a POST request on: ' + getLocalTimeString(date) + '\r\n';
			fs.appendFileSync(path.join('Logs','visitData.txt'),str);
			serveFile('index.html',res);
		}
	}
}

//Load all files
function serveFile(path,res){
	fs.readFile(path, function(err,data){
		if(err){
			res.statusCode = 404;
			res.end("File not found");
			return;
		}
		res.end(data);
	});
}

//Start server
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
	console.log("Listening at port " , PORT);
});

//Turns date into local time.
function getLocalTimeString(date){
	var newString = '';
	
	var amPM = 'AM';
	if(date.getHours() > 11){
		amPM = 'PM';
	}

	var hour = 0;
	if(date.getHours() > 12){
		hour = date.getHours() - 12;
	}
	else{
		hour = date.getHours();
	}
	
	if(date.getMinutes() < 10){
		newString = hour + ":0" + date.getMinutes() + ' ' + amPM;
	}
	else{
		newString = hour + ":" + date.getMinutes() + ' ' + amPM;
	}
	
	return newString;
}
