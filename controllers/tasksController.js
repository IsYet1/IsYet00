// tasksController.js
(function (tasksController){

    tasksController.init = function (app) {
        console.log("Initing tasksController");

        var DocumentDBClient = require('documentdb').DocumentClient;
        var config = require('../config');
        var TaskList = require('./tasklist');
        var TaskDao = require('../models/taskDao');

        var docDbClient = new DocumentDBClient(config.host, {
            masterKey: config.authKey
        });

        var taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);
        var taskList = new TaskList(taskDao);
        taskDao.init();

        app.get('/tasks/', taskList.getIncompleteTasks.bind(taskList));
        app.get('/tasks/status/:status', taskList.getIncompleteTasks.bind(taskList));

    } //End of Init

})(module.exports);