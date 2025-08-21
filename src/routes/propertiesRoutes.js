import { Router } from 'express';
import {
  addProperty,
  getProperties,
} from '../controllers/propertiesController.js';
import { validate } from '../middlewares/validate.js';
import { propertySchema } from '../schema/propertySchema.js';

const router = Router();

router.get('/', getProperties);
router.post('/', validate(propertySchema), addProperty);

export default router;
