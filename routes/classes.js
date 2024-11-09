const express = require('express');
const {getClasses,reserveClasses,addClasses,removeParticipant}=require('../controllers/classesController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/',auth,getClasses);
router.post('/reserve/:classId', auth ,reserveClasses);
router.post('/add_classes', auth ,addClasses);
router.post('/remove_participant/:classId', auth ,removeParticipant);

module.exports=router;