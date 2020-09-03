var express = require('express');

var app = express();

//set up template engine 
//now the project knows that we will use ejs for our templates 
app.set('view engine', 'ejs');

//static files 
//app.use (use some middleware)
//use this middleware and map it to a particular folder to find the static file 
app.use('/assets', express.static('/public'))


//listen to port
app.listen(3000);
console.log('You are listening to port 3000');

