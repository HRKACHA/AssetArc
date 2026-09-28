import { Router } from 'express';
import { 
  getAssets, 
  getAssetById, 
  createAsset, 
  updateAsset, 
  deleteAsset 
} from '../controllers/assetController';
import { protect, authorize } from '../middlewares/auth';

const router = Router();

// In a real implementation, we'd add `protect` to all these routes.
// For development convenience, we'll leave them open or partially protected.
// e.g., router.use(protect);

router.route('/')
  .get(getAssets)
  .post(protect, createAsset);

router.route('/:id')
  .get(getAssetById)
  .put(protect, updateAsset)
  .delete(protect, authorize('admin', 'manager'), deleteAsset);

export default router;
