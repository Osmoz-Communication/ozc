import { DataSource } from 'typeorm';
import { User } from '../../user.entity';

export class UserSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    // Vérifier si des utilisateurs existent déjà
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      console.log('Des utilisateurs existent déjà, seeder ignoré');
      return;
    }

    // Données de test
    const testUsers = [
      {
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
      },
      {
        name: 'Marie Martin',
        email: 'marie.martin@example.com',
      },
      {
        name: 'Pierre Durand',
        email: 'pierre.durand@example.com',
      },
      {
        name: 'Sophie Leroy',
        email: 'sophie.leroy@example.com',
      },
      {
        name: 'Antoine Bernard',
        email: 'antoine.bernard@example.com',
      },
    ];

    // Créer et sauvegarder les utilisateurs
    for (const userData of testUsers) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
    }

    console.log('✅ 5 utilisateurs de test créés avec succès');
  }
} 