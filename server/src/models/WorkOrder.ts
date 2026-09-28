import { Schema, model } from 'mongoose';
import { IBaseDocument, baseSchemaOptions, baseSchemaFields } from './BaseModel';

export interface IWorkOrder extends IBaseDocument {
  workOrderCode: string;
  assetId: Schema.Types.ObjectId;
  issue: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  severity: 'minor' | 'major' | 'critical';
  status: 'open' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  assignedTo?: Schema.Types.ObjectId;
  contractorId?: Schema.Types.ObjectId;
  estimatedCost?: number;
  actualCost?: number;
  dueDate?: Date;
  completedDate?: Date;
  completionNotes?: string;
  completionPhotos?: string[];
  verifiedBy?: Schema.Types.ObjectId;
  verifiedAt?: Date;
}

const workOrderSchema = new Schema<IWorkOrder>(
  {
    workOrderCode: { type: String, required: true, unique: true },
    assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
    issue: { type: String, required: true },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    severity: {
      type: String,
      enum: ['minor', 'major', 'critical'],
      default: 'minor'
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'on_hold', 'completed', 'cancelled'],
      default: 'open'
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    contractorId: { type: Schema.Types.ObjectId, ref: 'Contractor' },
    estimatedCost: { type: Number },
    actualCost: { type: Number },
    dueDate: { type: Date },
    completedDate: { type: Date },
    completionNotes: { type: String },
    completionPhotos: [{ type: String }],
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    ...baseSchemaFields
  },
  baseSchemaOptions
);

// Indexes
workOrderSchema.index({ workOrderCode: 1 });
workOrderSchema.index({ assetId: 1 });
workOrderSchema.index({ status: 1 });
workOrderSchema.index({ priority: 1 });
workOrderSchema.index({ assignedTo: 1 });
workOrderSchema.index({ dueDate: 1 });

export const WorkOrder = model<IWorkOrder>('WorkOrder', workOrderSchema);
