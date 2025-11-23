# 🔥 CalorieVision - Calculateur de Calories

Outil en ligne simple pour calculer et suivre vos calories quotidiennes.

## ✨ Fonctionnalités

- ✅ Suivi des calories par repas (petit-déj, déjeuner, dîner, snack)
- ✅ Objectif quotidien personnalisable
- ✅ Upload de photos pour vos repas
- ✅ Graphique de progression circulaire
- ✅ Historique complet avec dates
- ✅ Sauvegarde automatique dans le navigateur (localStorage)
- ✅ **Aucune connexion requise** - Fonctionne offline !

## 🚀 Démarrage Rapide

### 1. Installation

```bash
cd calorie-vision
cd client
npm install
```

### 2. Lancement

```bash
npm run dev
```

L'application sera sur : **http://localhost:5173**

## 📦 Build pour Production

```bash
npm run build
```

Les fichiers seront dans `client/dist/` - prêts à être déployés sur n'importe quel hébergeur statique (Vercel, Netlify, GitHub Pages, etc.)

## 🌐 Déploiement

### Vercel (Gratuit & Rapide)

```bash
cd client
npm install -g vercel
vercel
```

### Netlify

Glisser-déposer le dossier `client/dist` sur https://app.netlify.com/drop

### GitHub Pages

1. Push le code sur GitHub
2. Aller dans Settings > Pages
3. Sélectionner la branche et le dossier `/client/dist`

## 💾 Stockage des Données

Les données sont stockées **localement dans votre navigateur** (localStorage). Cela signifie :
- ✅ Aucun serveur requis
- ✅ Totalement privé
- ✅ Fonctionne offline
- ⚠️ Les données restent sur cet appareil/navigateur uniquement

## 🎨 Technologies

- **React 18** - Interface utilisateur
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styles modernes
- **Lucide React** - Icônes
- **localStorage** - Persistance locale

## 📱 Utilisation

1. Définir votre objectif quotidien
2. Ajouter vos repas avec nom et calories
3. Optionnel : Ajouter une photo
4. Voir votre progression en temps réel
5. Consulter l'historique

C'est tout ! Simple et efficace 🎉

---

**Note** : Application 100% frontend, aucun backend ou base de données nécessaire !
