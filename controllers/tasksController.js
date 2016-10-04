// tasksController.js
(function (tasksController){

    tasksController.init = function (app) {
        console.log("Initing tasksController");

        var DocumentDBClient = require('documentdb').DocumentClient;
        var config = require('../config');
        var TaskList = require('../routes/tasklist');
        var TaskDao = require('../models/taskDao');

        var docDbClient = new DocumentDBClient(config.host, {
            masterKey: config.authKey
        });

        var taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);
        var taskList = new TaskList(taskDao);
        taskDao.init();

        app.get("/tasks1/", function (req, res) {
            console.log("In the Get");
            //res.set("Content-Type", "application/json");
            //res.send("In the tasks controller");
            taskList.showTasks.bind(taskList);
        });

    } //End of Init

})(module.exports);