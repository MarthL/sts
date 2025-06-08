// src/seed.ts
import { runSeeder } from 'typeorm-extension';
import { AppDataSource } from '../data-source';
import { MainSeeder } from './main.seeder';

async function bootstrap() {
  await AppDataSource.initialize();

  await runSeeder(AppDataSource, MainSeeder);
  console.log('✅ Seeding terminé');

  await AppDataSource.destroy();
}

bootstrap().catch((err) => {
  console.error('Erreur pendant le seeding:', err);
});
