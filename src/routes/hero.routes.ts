import { Router } from 'express';
import { getCatalog, addFavorite, getMyFavorites, removeFavorite, createHero, updateHero, deleteHero } from '../controllers/hero.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/catalog', getCatalog);
router.get('/favorites', verifyToken, getMyFavorites);
router.post('/favorites', verifyToken, addFavorite);
router.delete('/favorites/:id', verifyToken, removeFavorite);
router.post('/', verifyToken, createHero);
router.put('/:id', verifyToken, updateHero);
router.delete('/:id', verifyToken, deleteHero);

export default router;
