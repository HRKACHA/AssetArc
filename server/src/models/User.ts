import { Schema, model } from 'mongoose';
import { IBaseDocument, baseSchemaOptions, baseSchemaFields } from './BaseModel';

export interface IUser extends IBaseDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'ASSET_MANAGER' | 'PROJECT_MANAGER' | 'INSPECTOR' | 'MAINTENANCE_OFFICER' | 'CONTRACTOR' | 'DECISION_MAKER';
  roleId?: Schema.Types.ObjectId;
  departmentId?: Schema.Types.ObjectId;
  status: 'active' | 'inactive' | 'suspended';
  lastLoginAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['ADMIN', 'ASSET_MANAGER', 'PROJECT_MANAGER', 'INSPECTOR', 'MAINTENANCE_OFFICER', 'CONTRACTOR', 'DECISION_MAKER'],
      default: 'ADMIN'
    },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    lastLoginAt: { type: Date },
    ...baseSchemaFields
  },
  baseSchemaOptions
);

userSchema.index({ email: 1 });
userSchema.index({ departmentId: 1 });
userSchema.index({ roleId: 1 });
userSchema.index({ status: 1 });

export const User = model<IUser>('User', userSchema);
