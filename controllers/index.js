(function (controllers) {
    var apiController = require("./apiController.js");

    controllers.init = function (app) {
        apiController.init(app);
    };
})(module.exports);