import { Router } from 'express';
import {
  addProperty,
  getProperties,
} from '../controllers/propertiesController.js';

const router = Router();

router.get('/', getProperties);
router.post('/', addProperty);

export default router;
