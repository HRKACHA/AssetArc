import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface TokenPayload {
  userId: Types.ObjectId | string;
  role?: string;
}

export const generateToken = (payload: TokenPayload, isRefresh = false): string => {
  const secret = isRefresh 
    ? process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret' 
    : process.env.JWT_SECRET || 'fallback_secret';
    
  const expiresIn = isRefresh
    ? process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    : process.env.JWT_EXPIRES_IN || '1h';

  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string, isRefresh = false): TokenPayload => {
  const secret = isRefresh 
    ? process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret' 
    : process.env.JWT_SECRET || 'fallback_secret';
    
  return jwt.verify(token, secret) as TokenPayload;
};
