//where the javascript will go that will control the behaviour of the to do list
//e.g. manipulate data, handle routes etc

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database 
mongoose.connect('mongodb://test:test@ds017195.mlab.com:17195/todo')

//Create a schema - like a blueprint 
var todoSchema = new mongoose.Schema({
    item: String
});

//the 'Todo' in the parentheses is the model name that will be stored in a collection in mongoDB
var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({
    item: 'buy flowers'
}).save(function(err){
    if(err) throw err;
    console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'code'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

//we are passing in the app from app.js
module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser,  function(req, res){
        data.push(req.body);
        //send the data back as JSON
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json('data');
    });
};