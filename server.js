const express = require('express');
const landShow = require('./routes/users');
const path = require('path');
const app = express();


// use ejs engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(landShow);


// use  a static path
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, (err,next) => {
    if(err){
        console.log("Server is not working!");
    } else {
        console.log("Your server is running on a port 3000");
    }
});