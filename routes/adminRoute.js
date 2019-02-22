const express = require('express');
const router = express.Router();
const adminControll = require('../controllers/adminControll');


router.get('/adminPar',adminControll.getAllPar);
router.get('/adminPar/:id', adminControll.getUser);
router.get('/adminPage', adminControll.getAdminPage);

router.get('/adminTeam', adminControll.getAdminTeam);
router.get('/add-teammate', adminControll.getAddTeammate);
router.get('/detail-teammate/:id', adminControll.getTeammate);
router.get('/edit-teammate/:id', adminControll.getEditTeammate);
router.post('/edit-teammate', adminControll.postEditTemmmate);

router.get('/adminGroup', adminControll.getAdminGroup);


router.post('/admin-addTeammate', adminControll.addNewTeamMate);
router.post('/delete-mate', adminControll.postDeleteTeamMate);


module.exports = router;