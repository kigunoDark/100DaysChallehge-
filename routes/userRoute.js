const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userControll');
const {check, body} =  require('express-validator/check');
const isAuth = require('../middleware/is-auth');


router.get('/', userControll.getLanding);
router.get('/profile', isAuth,  userControll.getMainPage);
router.get('/edit-user/:id', isAuth, userControll.getEditUser);
router.get('/teams-page', isAuth, userControll.getTeamsPage);
router.get('/add-team', isAuth, userControll.getAddTeamPage);
router.get('/users-list', isAuth, userControll.getListOfUsers);
router.get('/user-details/:id', isAuth, userControll.getUserDetails);
router.get('/team-details/:id', isAuth, userControll.getTeamDetails);
router.get('/edit-team/:id', isAuth, userControll.getEditTeam);
router.get('/team-requests', isAuth, userControll.getRequestsPage);

router.post('/delete-team', isAuth, userControll.postDeleteTeam);
router.post('/edit-team', isAuth, userControll.postEditTeam);
router.post('/signup', userControll.postSignUp);
router.post('/edit-user', isAuth, userControll.postEditUser);
router.post('/add-team', isAuth, userControll.postAddTeam);
router.post('/teammate-request', isAuth, userControll.postAddRequest);
router.post('/teammate-cancellation', isAuth, userControll.postCancelRequest);
router.post('/accept-user',isAuth, userControll.postAcceptRequest);
router.delete('/reject-user/:teamMateId', isAuth, userControll.denyRequest);
router.post('/mentor-request', isAuth, userControll.postMentorRequest);
module.exports = router;