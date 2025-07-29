import { Router } from "express";
import {getUri,postUri,getUriStats,updateclick} from '../controller/uriController.js';

const router=Router();

router.get('/getUri', getUri)

router.post('/shorten', postUri);

router.get('/:shortCode', getUriStats);

router.get('/r/:shortCode', updateclick);

export default router;