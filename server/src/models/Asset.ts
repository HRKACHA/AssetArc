import { Schema, model } from 'mongoose';
import { IBaseDocument, baseSchemaOptions, baseSchemaFields } from './BaseModel';

export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IAsset extends IBaseDocument {
  assetCode: string;
  name: string;
  categoryId?: Schema.Types.ObjectId;
  projectId?: Schema.Types.ObjectId;
  departmentId?: Schema.Types.ObjectId;
  owner?: string;
  location?: ILocation;
  address?: string;
  lifecycleStage: 'planning' | 'procurement' | 'commissioning' | 'active' | 'maintenance' | 'retired';
  status: 'operational' | 'attention' | 'critical' | 'offline';
  commissioningDate?: Date;
  expectedServiceLife?: number;
  expectedRetirementDate?: Date;
  conditionScore?: number;
  healthScore?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  criticality?: 'low' | 'medium' | 'high' | 'essential';
  utilization?: number;
  lastInspectionAt?: Date;
  nextInspectionAt?: Date;
  lastMaintenanceAt?: Date;
  renewalAssessmentYear?: number;
  handoverStatus?: string;
  qrCode?: string;
}

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true
  }
}, { _id: false });

const assetSchema = new Schema<IAsset>(
  {
    assetCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'AssetCategory' },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    owner: { type: String },
    location: locationSchema,
    address: { type: String },
    lifecycleStage: { 
      type: String, 
      enum: ['planning', 'procurement', 'commissioning', 'active', 'maintenance', 'retired'],
      default: 'active'
    },
    status: {
      type: String,
      enum: ['operational', 'attention', 'critical', 'offline'],
      default: 'operational'
    },
    commissioningDate: { type: Date },
    expectedServiceLife: { type: Number },
    expectedRetirementDate: { type: Date },
    conditionScore: { type: Number, min: 0, max: 100 },
    healthScore: { type: Number, min: 0, max: 100 },
    riskLevel: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
    criticality: { type: String, enum: ['low', 'medium', 'high', 'essential'] },
    utilization: { type: Number, min: 0, max: 100 },
    lastInspectionAt: { type: Date },
    nextInspectionAt: { type: Date },
    lastMaintenanceAt: { type: Date },
    renewalAssessmentYear: { type: Number },
    handoverStatus: { type: String },
    qrCode: { type: String },
    ...baseSchemaFields
  },
  baseSchemaOptions
);

// Indexes
assetSchema.index({ assetCode: 1 });
assetSchema.index({ location: '2dsphere' });
assetSchema.index({ departmentId: 1 });
assetSchema.index({ categoryId: 1 });
assetSchema.index({ status: 1 });
assetSchema.index({ lifecycleStage: 1 });
assetSchema.index({ conditionScore: 1 });

export const Asset = model<IAsset>('Asset', assetSchema);
