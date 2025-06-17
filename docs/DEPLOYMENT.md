# Guide de Déploiement - Osmoz Communication

## 🚀 Déploiement sur Vercel

### Configuration automatique
Le projet est maintenant configuré pour Vercel avec :

- **`vercel.json`** : Configuration de routage SPA et headers de sécurité
- **`vite.config.ts`** : Configuration optimisée pour la production
- **Build automatique** : `npm run build` → dossier `dist/`

### Étapes de déploiement

1. **Connecter le repository**
   ```bash
   # Cloner et pousser sur GitHub/GitLab/Bitbucket
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Déployer sur Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Importer le projet depuis GitHub
   - Vercel détectera automatiquement la configuration Vite
   - Déploiement automatique !

### Variables d'environnement (si nécessaire)
```bash
# Sur Vercel Dashboard > Settings > Environment Variables
VITE_API_URL=https://votre-api.com
```

## 🔧 Problèmes de Routing Résolus

### Avant la configuration
❌ `/admin` → 404 au reload  
❌ `/services` → 404 au reload  
❌ Routes directes cassées  

### Après la configuration
✅ Toutes les routes fonctionnent  
✅ Reload sur n'importe quelle page  
✅ Navigation directe par URL  
✅ Administration accessible  

## 📁 Structure de Build

```
dist/
├── index.html          # Point d'entrée SPA
├── assets/
│   ├── index-[hash].js # JavaScript bundlé
│   └── index-[hash].css # Styles bundlés
└── images/             # Assets statiques
```

## 🔒 Headers de Sécurité Inclus

- **X-Content-Type-Options**: Protection contre MIME sniffing
- **X-Frame-Options**: Protection contre clickjacking  
- **X-XSS-Protection**: Protection XSS
- **Cache-Control**: Pas de cache pour l'admin

## 🌐 Alternatives de Déploiement

### Netlify
- Le fichier `public/_redirects` est déjà configuré
- Glisser-déposer le dossier `dist/` sur Netlify

### GitHub Pages
```bash
npm run build
# Pousser le contenu de dist/ sur la branche gh-pages
```

## ✅ Vérifications Post-Déploiement

1. **Navigation** : Tester tous les liens du menu
2. **Reload** : Actualiser sur `/admin`, `/services`, etc.
3. **Administration** : Vérifier l'accès à `/admin`
4. **Assets** : Images et styles chargés correctement
5. **Mobile** : Responsive design fonctionnel

## 🐛 Troubleshooting

### Si les routes ne fonctionnent toujours pas :
1. Vérifier que `vercel.json` est à la racine
2. Confirmer que `base: '/'` dans `vite.config.ts`
3. Rebuilder et redéployer

### Si les assets ne chargent pas :
1. Vérifier les chemins dans `index.html`
2. S'assurer que les images sont dans `public/`
3. Éviter les chemins absolus locaux 