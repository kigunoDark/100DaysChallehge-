const path = require('path');
const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
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
const Team = require('./models/team');
const Role = require('./models/roles');
const User = require('./models/users');
const Status = require('./models/status');

var requests = [];

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
    if(res.locals.isAuthenticated)
    {
      
        const id = req.session.user.id;
        
         User.findById(id)
            .then(user => {
    
                res.locals.userId = user.id;
                res.locals.name = user.name;
                res.locals.roleId = user.roleId;
        
        })
        .catch(err => {

            if(err)
            {
                console.log(err);
            } else {
                console.log('Find everything!');
            }

        })
    }
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
Role.hasOne(User,  {constraints: true, onDelete: 'CASCADE'});

User.belongsTo(Team, { constraints: false});
Team.hasMany(User, {constraints: false});
User.hasOne(Team, {constraints:false});
Team.belongsTo(User,{constraints: false});

Status.belongsTo(User,{ as: 'userinfo', foreignKey: { name: 'userId' }, constraints: false});
Status.belongsTo(Team,{ as: 'teaminfo', foreignKey: { name: 'teamId' }, constraints: false});
// TeamMate.belongsTo(Accepted, {constraints: true, onDelete: 'CASCADE'});


sequelize
.sync()
.then(admin => {
   if(!admin)
   {
     console.log("You need to create an admin")
   }
   return admin;
})
.then( () => {
   http.listen(8080, (err,next) => {
        if(err){
            console.log("Server is not working!");
        } else {
            console.log("Your server is running on a port 8080");
        }

        io.on('connection', function(socket) {
         
            socket.on('addRequest', function(newRequest) {
                const reqTeamMateId = newRequest.reqTeamMateId;
                console.log(reqTeamMateId);
                const reqTeamId = newRequest.reqTeamId;
                const ms = "  1";
                User.findById(reqTeamMateId)
                .then(user => {
                    console.log(user.name);
                    
                });
                User.findById(reqTeamMateId)
                .then(user => {
                    if(user)
                    {
                    user.update({
                        teamId:reqTeamId,
                        teamStatus: "Принят"
                    })
                    Status.destroy({where: {userId:reqTeamMateId}})
                    io.emit("addRequest", ms );
                    return user.save();
                }
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            console.log('Socket is working')
        })
    });

})
.catch(err => {
    console.log(err);
});

