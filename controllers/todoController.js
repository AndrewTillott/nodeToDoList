//where the javascript will go that will control the behaviour of the to do list
//e.g. manipulate data, handle routes etc

var bodyParser = require('body-parser');

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

    app.delete('/todo', function(req, res){

    });
};