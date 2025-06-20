npm# OZC - Frontend + Backend

Ce projet contient un frontend Next.js et un backend NestJS configurés pour communiquer ensemble.

## 🚀 Démarrage rapide

### 1. Installation des dépendances

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Lancement des serveurs

Ouvrez **deux terminaux** :

**Terminal 1 - Frontend (port 3000)**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend (port 3001)**
```bash
cd backend
npm run start:dev
```

### 3. Test de la connexion

1. Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000)
2. Cliquez sur le bouton "Tester l'API" sur la page d'accueil
3. Vous devriez voir le message "Hello from NestJS!" si la connexion fonctionne

Vous pouvez aussi tester directement l'API backend en visitant [http://localhost:3001/api/hello](http://localhost:3001/api/hello)

## 📁 Structure du projet

```
ozc/
├── frontend/          # Application Next.js (port 3000)
│   ├── src/
│   │   └── app/
│   │       └── page.tsx    # Page avec test API
│   └── package.json
├── backend/           # Application NestJS (port 3001)
│   ├── src/
│   │   ├── main.ts         # Configuration serveur + CORS
│   │   ├── app.module.ts   # Module principal + TypeORM
│   │   ├── hello.controller.ts  # Contrôleur API /api/hello
│   │   └── user.entity.ts  # Exemple d'entité TypeORM
│   ├── .env            # Variables d'environnement (à créer)
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Backend (NestJS)
- Port : 3001
- CORS activé pour `http://localhost:3000`
- Endpoint de test : `GET /api/hello`
- **Base de données :** MySQL avec TypeORM
- **Synchronisation automatique** des entités activée (développement uniquement)

### Frontend (Next.js)
- Port : 3000
- Appel API vers `http://localhost:3001/api/hello`
- Interface de test intégrée dans la page d'accueil

## 🛠️ Développement

### Ajouter de nouveaux endpoints

1. Créer un nouveau contrôleur dans `backend/src/`
2. L'ajouter au module dans `backend/src/app.module.ts`
3. Utiliser `fetch()` dans le frontend pour appeler l'API

### Utiliser TypeORM

1. **Créer une entité** (exemple : `user.entity.ts`) :
   ```typescript
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

   @Entity('users')
   export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @Column({ unique: true })
     email: string;
   }
   ```

2. **Utiliser dans un service** :
   ```typescript
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { User } from './user.entity';

   @Injectable()
   export class UserService {
     constructor(
       @InjectRepository(User)
       private userRepository: Repository<User>,
     ) {}

     async findAll(): Promise<User[]> {
       return this.userRepository.find();
     }
   }
   ```

3. **Ajouter au module** :
   ```typescript
   @Module({
     imports: [TypeOrmModule.forFeature([User])],
     // ...
   })
   ```

### Variables d'environnement

#### Frontend
Pour utiliser des variables d'environnement dans le frontend, créez un fichier `.env.local` :

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Puis dans votre code React :
```typescript
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`);
```

#### Backend - Configuration MySQL
Créez un fichier `.env` dans le dossier `backend/` :

```bash
# backend/.env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=votre_nom_de_bdd
```

**Note :** Assurez-vous d'avoir MySQL installé et une base de données créée avant de lancer le backend. 