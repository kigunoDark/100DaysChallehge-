const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userControll');
const {check, body} =  require('express-validator/check');
const isAuth = require('../middleware/is-auth');

router.get('/', userControll.getLanding);
router.get('/profile', isAuth, userControll.getMainPage);
router.get('/edit-user/:id', isAuth, userControll.getEditUser);
router.get('/teams-page', isAuth, userControll.getTeamsPage);
router.get('/add-team', isAuth, userControll.getAddTeamPage);
router.get('/users-list', isAuth, userControll.getListOfUsers);
router.get('/user-details/:id', isAuth, userControll.getUserDetails);
router.get('/team-details/:id', isAuth, userControll.getTeamDetails);

router.post('/signup', userControll.postSignUp);
router.post('/edit-user', isAuth, userControll.postEditUser);
router.post('/add-team', isAuth, userControll.postAddTeam)
module.exports = router;