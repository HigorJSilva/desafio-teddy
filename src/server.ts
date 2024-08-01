import { AppDataSource } from '@shared/database/datasource';
import application from '@shared/server';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

AppDataSource.initialize().then(() => {
  console.log('Data Source running!');

  application.listen(process.env.PORT, () => {
    console.log('Server running');
  });
});
