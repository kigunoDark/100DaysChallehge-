const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/adminRoute');
const errControll = require('./controllers/errorController');
const sequelize = require('./data/database');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const multer = require('multer');
// Зачища от csrf
const csrf = require('csurf');
// Для вывода ошибок через сессию
const flash = require('connect-flash');


// My models
const TeamMate = require('./models/team');
const Accepted = require('./models/accepted-team');
const Role = require('./models/roles');
const Admin = require('./models/admin');
const User = require('./models/users');


const app = express();
const csrfProtection = csrf();

const fileFilter = (req,file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
 
}
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Math.random() + '-' + Date.now() +  '-' + file.originalname);
    }
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images' ,express.static(path.join(__dirname, 'images')));
app.use(cookieParser());
app.use(session({
    secret: 'be a human', 
    resave: false, 
    saveUninitialized: false, 
    store: new SequelizeStore({
    db: sequelize
})
}));
app.use(csrfProtection);
app.use(flash());
app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    // res.locals.name= req.session.user.name;
    // res.locals.adminId =  +req.session.user.roleId;
    next();
})



const landRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
// APP.USE OF ROUTES

app.use(landRoute);
app.use('/admin', adminRoute);
app.use( authRoute);
app.use(errControll.get404);

// Role.belongsTo(Admin,{constraints: true, onDelete: 'CASCADE'} );
Role.hasOne(User);
TeamMate.belongsTo(Accepted, {constraints: true, onDelete: 'CASCADE'});

sequelize
.sync()

.then(admin => {
   if(!admin)
   {
     console.log("You need to create an admin")
   }
   return admin;
})
.then( admin => {
    app.listen(process.env.PORT || 3000, (err,next) => {
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

