import express from 'express';
import controller from '../controllers/phoneController';
const router = express.Router();

router.get('/phones', controller.getPhones);
router.get('/phones/:id', controller.getPhone);
router.delete('/phones/:id', controller.deletePhone);
router.put('/phones/:id', controller.updatePhone);

export = router;