const http = require('http');
const fs = require('fs');
var path = require('path');

const PORT = 81;

function makeHTML(data){
	var html = '';
	html += '<!DOCTYPE html>';
	html += '<html>';
	html += '<head>';
	html += '	<title>My Site Analytics</title>';
	html += '</head>';
	
	
	html += '<body>';
	html += '<div id="wrapper" style="width:900px; margin: 0 auto; text-align: center; font-family: Arial">'
	
	var allTimeSiteVisits = 0;
	var todayVisits = 0;
	var date = new Date();
	
	var info = data.split('\n');
	for(var i = 0; i < info.length; i++){
		if(info[i].length > 2){
			allTimeSiteVisits++;
			
			var d = info[i].split(',')[0].split('-'); //5-2-2021,5:40 PM    =     5-2-2021 5:40 PM    =    5 2 2021
			
			if(d[0] == date.getMonth() && d[1] == date.getDay() && d[2] == date.getFullYear()){
				todayVisits++;
			}
		}
	}
	
	html += '	<div style="text-align: center; width: 100%;">'
	html += '   	<p style="border: solid">Stats for rcody.com</p>';
	
	html += '		<div style="background-color: red; margin-left: 300px; margin-right: 300px; border-radius: 10px; padding: 10px;">'
	html += '			<text style="font-size: 16px; color: white">All Time site visits</text><br>';
	html += '			<text style="font-size: 32px; color: white">' + allTimeSiteVisits + '</text>';
	html += '   	</div><br>';
	

	html += '		<div style="background-color: red; margin-left: 300px; margin-right: 300px; border-radius: 10px; padding: 10px;">'
	html += '			<text style="font-size: 16px; color: white">Today</text><br>';
	html += '			<text style="font-size: 32px; color: white">' + todayVisits + '</text>';
	html += '		</div>';
	html += '	</div>';
	
	html += '</div>'; //End wrapper
	html += '</body>';
	
	
	html += '</html>';
	
	return html;
}

function handleRequest(req,res){
	if(req.url == '/'){
		 var data = fs.readFileSync(path.join('Logs','visitData.txt'),{encoding:'utf8', flag:'r'});
		 var html = makeHTML(data);
		 res.setHeader('Content-Type', 'text/html');
		 res.end(html);
	}
	//Not having else down here should stop any other files from being loaded by the server.
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
