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
/*var itemOne = Todo({
    item: 'buy flowers'
}).save(function(err){
    if(err) throw err;
    console.log('item saved');
});*/

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'code'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

//we are passing in the app from app.js
module.exports = function(app){
    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to the view 
        //find can find one object or all of them (empty object is to get all in the todo collection)
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        })
       //alternative: Todo.find({item: 'buy  flowers'}); 
       // res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser,  function(req, res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            //send the data back as JSON
        res.json(data);
        })
        //data.push(req.body);
       
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        })
        /*data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json('data');*/
    });
};