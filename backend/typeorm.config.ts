import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

// Charger les variables d'environnement
ConfigModule.forRoot({
  envFilePath: '.env.development',
});

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false, // Important : toujours false en production
  logging: true,
}); 