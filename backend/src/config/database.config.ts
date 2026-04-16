import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface DatabaseConfig extends MongooseModuleOptions {
  uri: string;
}

export const databaseConfig: DatabaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gestao-usuarios',
};