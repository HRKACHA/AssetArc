import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Asset } from '../models/Asset';

dotenv.config();

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/assetarc');
    console.log('Connected.');

    // Clear existing
    await User.deleteMany({});
    await Asset.deleteMany({});
    
    console.log('Cleared existing data.');

    // Create Users for each role
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    const roles = ['ADMIN', 'ASSET_MANAGER', 'PROJECT_MANAGER', 'INSPECTOR', 'MAINTENANCE_OFFICER', 'CONTRACTOR', 'DECISION_MAKER'];
    const users = [];

    for (const role of roles) {
      const user = await User.create({
        name: `${role.replace('_', ' ')} User`,
        email: `${role.toLowerCase()}@assetarc.gov`,
        passwordHash,
        role: role,
        status: 'active'
      });
      users.push(user);
    }
    console.log(`Created ${users.length} users with distinct roles (password: admin123).`);
    const adminId = users[0]._id;

    // Create 20 Sample Assets around Gujarat
    const cities = [
      { name: 'Ahmedabad', lng: 72.5714, lat: 23.0225 },
      { name: 'Surat', lng: 72.8311, lat: 21.1702 },
      { name: 'Vadodara', lng: 73.1812, lat: 22.3072 },
      { name: 'Rajkot', lng: 70.7923, lat: 22.3039 },
      { name: 'Bhavnagar', lng: 72.1519, lat: 21.7645 },
      { name: 'Jamnagar', lng: 70.0577, lat: 22.4707 },
      { name: 'Gandhinagar', lng: 72.6369, lat: 23.2156 }
    ];
    
    const types = ['Transformer Substation', 'Water Pump Station', 'Expressway Sensor Array', 'Backup Generator', 'Solar Panel Array', 'Bridge Structural Monitor'];
    
    const assetsToCreate = Array.from({ length: 20 }).map((_, i) => {
      const city = cities[i % cities.length];
      // slight randomization of coordinates
      const latOffset = (Math.random() - 0.5) * 0.1;
      const lngOffset = (Math.random() - 0.5) * 0.1;
      
      const statuses = ['operational', 'attention', 'critical', 'offline'];
      const stages = ['active', 'maintenance', 'commissioning'];
      
      return {
        assetCode: `AST-100${i + 1}`,
        name: `${city.name} ${types[i % types.length]} ${i + 1}`,
        lifecycleStage: stages[i % stages.length],
        status: statuses[i % statuses.length],
        location: {
          type: 'Point',
          coordinates: [city.lng + lngOffset, city.lat + latOffset]
        },
        conditionScore: Math.floor(Math.random() * 40) + 60,
        healthScore: Math.floor(Math.random() * 30) + 70,
        expectedServiceLife: Math.floor(Math.random() * 20) + 10,
        riskLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        criticality: ['low', 'medium', 'high', 'essential'][Math.floor(Math.random() * 4)],
        createdBy: adminId
      };
    });

    await Asset.insertMany(assetsToCreate);
    console.log(`Created ${assetsToCreate.length} sample assets.`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
