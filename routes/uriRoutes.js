import { Router } from "express";
import {getUri,postUri,getUriStats,updateclick} from '../controller/uriController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router=Router();

router.get('/getUri', getUri)

router.post('/shorten', authMiddleware, postUri);

router.get('/:shortCode',authMiddleware, getUriStats);

router.get('/r/:shortCode', updateclick);

export default router;