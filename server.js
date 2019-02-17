const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/adminRoute');
const errControll = require('./controllers/errorController');
// var expressValidator = require("express-validator");

const sequelize = require('./data/database');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressValidator());


// USING OF SEQUELIZE FOR WORKING WIH MYSQL

sequelize.sync()
.then(result => {
    //  console.log(result);
})
.catch(err => {
    console.log(err);
});
const landRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
// APP.USE OF ROUTES

app.use(landRoute);
app.use( adminRoute);
app.use(authRoute);

app.use(errControll.get404);

app.listen(3000, (err,next) => {
    if(err){
        console.log("Server is not working!");
    } else {
        console.log("Your server is running on a port 3000");
    }
});


// db.execute('SELECT * FROM users').then((result) => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// });
