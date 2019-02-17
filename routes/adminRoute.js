const express = require('express');
const router = express.Router();
const adminControll = require('../controllers/adminControll');


router.get('/adminPar',adminControll.getAllPar);
router.get('/adminPar/:id', adminControll.getUser);
router.get('/adminPage', adminControll.getAdminPage);
router.get('/adminTeam', adminControll.getAdminTeam);
router.get('/edit-teammate', adminControll.editTeamMate);

router.get('/adminGroup', adminControll.getAdminGroup);


router.post('/adminAddMate', adminControll.addNewTeamMate);
router.post('/delete-mate', adminControll.postDeleteTeamMate);


module.exports = router;