var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
//Your request handler should send listingData in the JSON format as a response if a GET request is sent to the '/listings' path. Otherwise, it should send a 404 error. Aka checking for errors.
  if (request.method === "GET" && parsedUrl.path === "/listings") {
      response.statusCode = 200;
      response.write(listingData);
  } else {
      response.statusCode = 404;
      response.write("Bad gateway error");
  }
    response.end();
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  listingData = data;
    startServer();
//This callback function saves the data in the listingData variable, then start the server. 
}); 

function startServer(){
    server = http.createServer(requestHandler);
    server.listen(port, function() {
        console.log("Server listening on: http://127.0.0.1:" + port);
//Starts the server
    });
}
 


