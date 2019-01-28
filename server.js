const express = require('express');
const bodyParser = require('body-parser');
// var expressValidator = require("express-validator");
const landShow = require('./routes/userRoute');
const adminShow = require('./routes/adminRoute');
const db = require('./data/database');
const path = require('path');
const app = express();

// app.use of ejs engine
app.set('view engine', 'ejs');
app.set('views', 'views');

db.execute('SELECT * FROM users').then((result) => {
    console.log(result);
}).catch(err => {
    console.log(err);
});

app.use(bodyParser.urlencoded({extended: true}));
// app.use of a static path
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressValidator());

// app.use of our routes
app.use(landShow);
app.use( adminShow);



app.listen(3000, (err,next) => {
    if(err){
        console.log("Server is not working!");
    } else {
        console.log("Your server is running on a port 3000");
    }
});