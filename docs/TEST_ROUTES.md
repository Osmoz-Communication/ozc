# Test des Routes - Osmoz Communication

## Routes à tester après déploiement Vercel

### ✅ Routes publiques
- [ ] `/` - Page d'accueil
- [ ] `/qui-sommes-nous` - À propos
- [ ] `/services` - Services
- [ ] `/secteurs` - Secteurs
- [ ] `/portfolio` - Portfolio
- [ ] `/blog` - Blog
- [ ] `/contact` - Contact

### ✅ Routes d'administration (CRITIQUES)
- [ ] `/login` - Page de connexion admin
- [ ] `/administration` - Dashboard admin
- [ ] `/osmozcom77120` - Dashboard admin (route alternative)

### ✅ Test de reload (F5)
- [ ] Reload sur `/login` → doit rester sur `/login`
- [ ] Reload sur `/administration` → doit rester sur `/administration`
- [ ] Reload sur `/services` → doit rester sur `/services`

### ✅ Test de navigation directe
- [ ] Aller directement à `https://votre-site.vercel.app/login`
- [ ] Aller directement à `https://votre-site.vercel.app/administration`
- [ ] Aller directement à `https://votre-site.vercel.app/osmozcom77120`

## Configuration Vercel appliquée

### 1. `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "routes": [
    {
      "src": "/login",
      "dest": "/index.html"
    },
    {
      "src": "/administration", 
      "dest": "/index.html"
    },
    {
      "src": "/osmozcom77120",
      "dest": "/index.html"
    }
  ]
}
```

### 2. `vite.config.ts`
- ✅ `base: '/'` configuré
- ✅ `outDir: 'dist'` configuré
- ✅ Build optimisé pour production

## Si les routes admin ne marchent toujours pas :

### Solution 1 : Vérifier les logs Vercel
1. Aller sur Vercel Dashboard
2. Cliquer sur votre projet
3. Onglet "Functions" → Voir les logs
4. Chercher les erreurs 404

### Solution 2 : Test en local
```bash
npm run build
npm run preview
# Tester http://localhost:3000/administration
```

### Solution 3 : Forcer le redéploiement
1. Faire un petit changement (ajouter un espace)
2. Commit et push
3. Vercel redéploiera automatiquement

### Solution 4 : Configuration alternative
Si ça ne marche toujours pas, essayer cette config dans `vercel.json` :

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
``` 