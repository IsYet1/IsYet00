var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function TaskList(taskDao) {
  this.taskDao = taskDao;
}

module.exports = TaskList;

TaskList.prototype = {
    getOneTask : function(req, res){
        var self = this;

        var id = req.params.id;

        self.taskDao.getItem(id, function (err, item) {
            if (err) {
                throw (err);
            }
            res.send(item);
        });
    },

    getTasks: function (req, res) {
        var self = this;

        var qry = 'SELECT * FROM root r';
        if (req.params.field)
            qry = 'SELECT * FROM root r WHERE r.' + req.params.field + '=' + req.params.value;
        
        var querySpec = {
            query: qry

        };

        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            res.send(items);
        });
    },

    addTask: function (req, res) {
        var self = this;
        var item = req.body;

        item.date = Date.now();
        item.completed = false;

        if (item.t){
            var ticks = item.t + (item.date * 10000 + 621355968000000000);
            item.id = ticks;
        }

        self.taskDao.addItem(item, function (err) {
            if (err) {
                throw (err);
            }
            res.send(item);
            // res.redirect('/tasks/' + item.id);
        });
    },

    updateTask: function (req, res) {
        var self = this;
        var item = req.body;
        var itemId = item.id;

        self.taskDao.updateItem(itemId, item, function (err) {
            if (err) {
                throw (err);
            }
            res.send(item);
            // res.redirect('/tasks/' + item.id);
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
    }
};