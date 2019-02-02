const express = require('express');
const router = express.Router();
const adminControll = require('../controllers/adminControll');


router.get('/adminPar',adminControll.getAllPar);
router.get('/adminPage', adminControll.getAdminPage);
router.get('/adminTeam', adminControll.getAdminTeam);
router.get('/adminGroup', adminControll.getAdminGroup);


module.exports = router;