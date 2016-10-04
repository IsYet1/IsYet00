console.log("Starting up");

// Load the http module to create an http server
var http = require('http');
var express = require("express");

var app = express();

var port = process.env.PORT || 8000;


var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var TaskList = require('./routes/tasklist');
var TaskDao = require('./models/taskDao');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

var taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);
var taskList = new TaskList(taskDao);
taskDao.init();

app.get('/tasks/', taskList.showTasks.bind(taskList));



var controllers = require("./controllers");
controllers.init(app);

app.get('/', function(req, res){
    res.send("Test from Express. 30-Sep 1625 Did this fix the thisis issue?");
});

var server = http.createServer(app);
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:" + port + " - Localhost");
