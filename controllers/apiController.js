// notesController.js
(function (apiController){

    apiController.init = function (app) {
        app.get("/api/:categoryName", function (req, res) {

            var categoryName = req.params.categoryName;
            res.set("Content-Type", "text/plain");
            res.send(categoryName);
        });

    } //End of Init

})(module.exports);