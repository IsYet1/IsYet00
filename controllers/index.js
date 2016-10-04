(function (controllers) {
    var apiController = require("./apiController.js");
    var tasksController = require("./tasksController.js");

    controllers.init = function (app) {
        apiController.init(app);
        tasksController.init(app);
    };
})(module.exports);