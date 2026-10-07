import {Router} from 'express';import {register,login,me} from '../controllers/authController.js';import {protect} from '../middleware/auth.js';import {validateRegister} from '../middleware/validate.js';
const r=Router();r.post('/register',validateRegister,register);r.post('/login',login);r.get('/me',protect,me);export default r;
