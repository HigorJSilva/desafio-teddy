import application from '@shared/server';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

application.listen(process.env.PORT, () => {
  console.log('Server running');
});
