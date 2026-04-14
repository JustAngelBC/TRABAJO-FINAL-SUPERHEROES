import { Router } from 'express';
import { register, login, updateUser } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update', verifyToken, updateUser);

export default router;
