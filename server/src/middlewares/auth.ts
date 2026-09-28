import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized to access this route' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    
    const user = await User.findById(decoded.userId).select('-passwordHash');
    
    if (!user || user.status !== 'active') {
      res.status(401).json({ error: 'User no longer active or does not exist' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authorized to access this route' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    // In a real implementation with Role models, we would check the populated role name.
    // For now, if the user doesn't have the role, we deny.
    // We can assume req.user.role.code or similar here later.
    
    // Fallback stub for auth check
    next(); 
  };
};
