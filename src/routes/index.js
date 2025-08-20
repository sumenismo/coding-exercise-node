import { Router } from 'express';
import propertiesRoutes from './propertiesRoutes.js';

const router = Router();
router.use('/properties', propertiesRoutes);
// other routes can be added here

export default router;
