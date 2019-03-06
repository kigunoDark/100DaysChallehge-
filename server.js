const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/adminRoute');
const errControll = require('./controllers/errorController');
const session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const Admin = require('./models/admin');
// Зачища от csrf
const csrf = require('csurf');
// Для вывода ошибок через сессию
const flash = require('connect-flash');


const sequelize = require('./data/database');


const app = express();
const csrfProtection = csrf();



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'be a human', resave: false, saveUninitialized: false, 
    store: new SequelizeStore({
    db: sequelize
})
}));
app.use(csrfProtection);
app.use(flash());
app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

const landRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
// APP.USE OF ROUTES

app.use(landRoute);
app.use('/admin', adminRoute);
app.use( authRoute);
app.use(errControll.get404);


sequelize
.sync()
.then(result => {
   return Admin.findById(1);
})
.then(admin => {
   
})
.then( admin => {
    app.listen(3000, (err,next) => {
        if(err){
            console.log("Server is not working!");
        } else {
            console.log("Your server is running on a port 3000");
        }
    }); 
})
.catch(err => {
    console.log(err);
});

