const express = require('express');
const bodyParser = require('body-parser');
const landShow = require('./routes/userRoute');
const adminShow = require('./routes/adminRoute');
const path = require('path');
const app = express();


// app.use of ejs engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use of our routes
app.use(landShow);
app.use( adminShow);

app.use(bodyParser.urlencoded({extended: false}));
// app.use of a static path
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, (err,next) => {
    if(err){
        console.log("Server is not working!");
    } else {
        console.log("Your server is running on a port 3000");
    }
});