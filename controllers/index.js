(function (controllers) {
    var rootController = require("./rootController.js");
    var apiController = require("./apiController.js");
    var tasksController = require("./tasksController.js");

    controllers.init = function (app) {
        rootController.init(app);
        tasksController.init(app);
        apiController.init(app);
    };
})(module.exports);