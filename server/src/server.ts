import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());
import authRoutes from './routes/authRoutes';
import assetRoutes from './routes/assetRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'AssetArc API is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
