import { Request, Response } from 'express';
import { Asset } from '../models/Asset';

export const getAssets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, lifecycleStage, search, lng, lat, maxDistance } = req.query;
    
    let query: any = {};
    
    if (status) query.status = status;
    if (lifecycleStage) query.lifecycleStage = lifecycleStage;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { assetCode: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (lng && lat) {
      const distance = maxDistance ? parseInt(maxDistance as string) : 50000; // Default 50km
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)]
          },
          $maxDistance: distance
        }
      };
    }
    
    const assets = await Asset.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving assets' });
  }
};

export const getAssetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving asset' });
  }
};

export const createAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const assetData = { ...req.body };
    
    // In a real app, req.user._id would be populated by the protect middleware
    // assetData.createdBy = (req as any).user._id;
    
    const asset = await Asset.create(assetData);
    
    res.status(201).json({
      success: true,
      data: asset
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Asset with this code already exists' });
      return;
    }
    res.status(500).json({ error: 'Server error creating asset' });
  }
};

export const updateAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = { ...req.body };
    // updateData.updatedBy = (req as any).user._id;
    
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!asset) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating asset' });
  }
};

export const deleteAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    // Soft delete implementation
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!asset) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting asset' });
  }
};
