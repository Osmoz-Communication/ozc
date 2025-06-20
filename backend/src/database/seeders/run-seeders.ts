import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../../user.entity';
import { UserSeeder } from './user.seeder';

// Charger les variables d'environnement depuis .env.development
config({ path: '.env.development' });

async function runSeeders() {
  console.log('🔧 Configuration de la base de données:');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Port: ${process.env.DB_PORT}`);
  console.log(`User: ${process.env.DB_USER}`);
  console.log(`Database: ${process.env.DB_NAME}`);
  
  // Configuration de la source de données
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    entities: [User],
    synchronize: false, // Important : ne pas synchroniser en production
  });

  try {
    // Initialiser la connexion
    await dataSource.initialize();
    console.log('🔗 Connexion à la base de données établie');

    // Exécuter les seeders
    const userSeeder = new UserSeeder();
    await userSeeder.run(dataSource);

    console.log('🌱 Tous les seeders ont été exécutés avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution des seeders:', error);
  } finally {
    // Fermer la connexion
    await dataSource.destroy();
    console.log('🔒 Connexion fermée');
  }
}

// Exécuter les seeders
runSeeders(); 