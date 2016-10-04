// notesController.js
(function (rootController){

    rootController.init = function (app) {
        app.get("/", function (req, res) {

            res.set("Content-Type", "text/plain");
            res.send("Root Controller.");
        });

    } //End of Init

})(module.exports);