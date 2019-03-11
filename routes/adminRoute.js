const express = require('express');
const router = express.Router();
const adminControll = require('../controllers/adminControll');
const isAuth = require('../middleware/is-auth');


router.get('/adminPar', isAuth, adminControll.getAllPar);
router.get('/adminPar/:id', isAuth, adminControll.getUser);
router.get('/adminPage', isAuth, adminControll.getAdminPage);

router.get('/adminTeam', isAuth, adminControll.getAdminTeam);
router.get('/add-teammate', isAuth, adminControll.getAddTeammate);
router.get('/detail-teammate/:id', isAuth, adminControll.getTeammate);
router.get('/edit-teammate/:id', isAuth, adminControll.getEditTeammate);
router.get('/adminGroup', isAuth, adminControll.getAdminGroup);
router.get('/admins', isAuth, adminControll.getAddAdmin);
router.get('/reset', isAuth, adminControll.getReset);
router.post('/reset',isAuth, adminControll.postReset);
router.get('/reset/:token', isAuth, adminControll.getResetPassword);
router.post('/new-password', isAuth, adminControll.postNewPassword);
router.post('/admin-add', isAuth, adminControll.postAddAdmin);
router.post('/add-camp', isAuth, adminControll.postToCamp);

router.post('/admin-addTeammate', isAuth, adminControll.addNewTeamMate);
router.post('/delete-mate', isAuth, adminControll.postDeleteTeamMate);
router.post('/delete-admin', isAuth, adminControll.postDeleteAdmin);
router.post('/edit-teammate', isAuth, adminControll.postEditTemmmate);


module.exports = router;