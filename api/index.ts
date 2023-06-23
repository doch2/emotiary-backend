// music, movie를 분리해주는 라우팅 역할
import { Router } from 'express';
import diary_router from './diary';

const router = Router();


router.use('/diary', diary_router);

export default router;