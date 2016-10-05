var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function TaskList(taskDao) {
  this.taskDao = taskDao;
}

module.exports = TaskList;

TaskList.prototype = {
    getTasks: function (req, res) {
        var self = this;

        var querySpec = 'SELECT * FROM root r';
        if (req.params.status)
            querySpec = setQuerySpec_Status (req.params.status;
        if (req.params.id)
            querySpec = setQuerySpec_Id (req.params.id);

        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }

            res.send(items);

        });
    },

    addTask: function (req, res) {
        var self = this;
        var item = req.body || {name: "Test Post Task", category: "Manual Entry"}; //In case the body isn't loaded. body-parser missing.'

        self.taskDao.addItem(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });
    },

    updateTask: function (req, res) {
        var self = this;
        var item = req.body;
        var itemId = item.id;
        // var itemRId = item._rid;

        self.taskDao.updateItem(itemId, item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });
    },

    completeTask: function (req, res) {
        var self = this;
        var completedTasks = Object.keys(req.body);

        async.forEach(completedTasks, function taskIterator(completedTask, callback) {
            self.taskDao.completeItem(completedTask, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    },

    setQuerySpec_Status: function(status){
        var qry = 'SELECT * FROM root r WHERE r.completed=@completed';
        var completed = false;
        if (status == 0 || status == 1){
            switch (req.params.status) {
                case "0":
                    completed = false;
                    break;
                case "1":
                    completed = true;
                    break;
           
                default:
                    break;
            }
            
            var querySpec = {
                query: qry,
                parameters: [{
                    name: '@completed',
                    value: completed
                }]
            };            
        }

        return querySpec;
    },

    setQuerySpec_Id: function(id){
        var qry = 'SELECT * FROM root r WHERE r.id=@id';
        var querySpec = {
            query: qry,
            parameters: [{
                name: '@id',
                value: id
            }]
        };            
        return querySpec;
    }

}

};