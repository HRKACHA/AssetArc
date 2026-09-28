import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email }).select('+passwordHash');
    
    if (!user || user.status !== 'active') {
      res.status(401).json({ error: 'Invalid credentials or inactive account' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    user.lastLoginAt = new Date();
    await user.save();

    const accessToken = generateToken({ userId: user._id as string });
    const refreshToken = generateToken({ userId: user._id as string }, true);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'ADMIN',
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      passwordHash
    });

    const accessToken = generateToken({ userId: user._id as string });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'ADMIN',
        },
        tokens: {
          accessToken
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const getMe = async (req: any, res: Response): Promise<void> => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'ADMIN',
    }
  });
};
