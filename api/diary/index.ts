// CRUD 기능을 라우팅하는 역할
import { Router } from 'express';
import { list, detail, create, update, remove } from './diary.ctrl';

const router = Router();

// http://localhost:3000/diary/1
router.get('/', list);
router.get('/:id', detail);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;