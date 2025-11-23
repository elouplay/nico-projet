# 🚀 Guide de Déploiement CalorieVision

## Architecture Simplifiée

L'application utilise maintenant **un seul serveur Node.js** qui sert à la fois :
- L'API REST (`/api/*`)
- Le frontend React buildé (fichiers statiques)

---

## 📦 Déploiement en Production

### 1️⃣ **Prérequis**

- Node.js v16+
- MongoDB (local ou MongoDB Atlas)

### 2️⃣ **Installation**

```bash
# Cloner le projet
git clone <votre-repo>
cd calorie-vision

# Installer toutes les dépendances
npm run install-all
```

### 3️⃣ **Configuration**

Éditer `server/.env` :

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/calorie-vision
JWT_SECRET=votre_secret_tres_securise_a_changer
NODE_ENV=production
```

### 4️⃣ **Build et Démarrage**

```bash
# Build + Start en une commande
npm start
```

✅ L'application sera accessible sur http://localhost:5000

---

## 🛠️ Modes de Fonctionnement

### **Mode Production** (recommandé)

```bash
npm start
```

- Build automatique du frontend React
- Démarre le serveur Node.js sur le port 5000
- Sert le frontend depuis `/client/dist`
- Prêt pour le déploiement

### **Mode Développement** (optionnel)

Pour développer le frontend avec hot-reload :

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

Frontend sur http://localhost:5173 (avec proxy API)

---

## ☁️ Déploiement sur Heroku

### 1. Préparer le projet

Créer un `Procfile` à la racine :

```
web: npm start
```

### 2. Déployer

```bash
# Installer Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Se connecter
heroku login

# Créer l'app
heroku create calorie-vision-app

# Ajouter MongoDB
heroku addons:create mongolab:sandbox

# Configurer les variables
heroku config:set JWT_SECRET=votre_secret_securise
heroku config:set NODE_ENV=production

# Déployer
git push heroku main
```

---

## 🌐 Déploiement sur Render

1. Créer un compte sur https://render.com
2. Créer un **Web Service**
3. Connecter votre repo GitHub
4. Configuration :
   - **Build Command** : `npm run install-all`
   - **Start Command** : `npm start`
   - **Environment Variables** :
     - `MONGO_URI` : votre URI MongoDB Atlas
     - `JWT_SECRET` : votre secret
     - `NODE_ENV` : production

---

## 🐳 Déploiement avec Docker

Créer un `Dockerfile` :

```dockerfile
FROM node:18-alpine
WORKDIR /app

# Copier package.json
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Installer dépendances
RUN npm run install-all

# Copier le code
COPY . .

# Build frontend
RUN npm run build

# Exposer le port
EXPOSE 5000

# Démarrer
CMD ["node", "server/index.js"]
```

Build et run :

```bash
docker build -t calorie-vision .
docker run -p 5000:5000 -e MONGO_URI=<uri> -e JWT_SECRET=<secret> calorie-vision
```

---

## 📊 Structure des Fichiers en Production

```
calorie-vision/
├── client/
│   └── dist/              # ← Frontend buildé (servi par Express)
│       ├── index.html
│       ├── assets/
│       └── ...
├── server/
│   ├── index.js           # ← Serveur principal
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── package.json
```

---

## ✅ Vérification

Après déploiement, tester :

1. **API** : http://votre-domaine.com/api
   - Doit retourner : `{"message": "API CalorieVision est en ligne ✅"}`

2. **Frontend** : http://votre-domaine.com
   - Doit afficher la page de connexion

3. **Routes API** :
   - POST http://votre-domaine.com/api/auth/register
   - POST http://votre-domaine.com/api/auth/login
   - GET http://votre-domaine.com/api/entries (avec token)

---

## 🔒 Checklist Sécurité Production

- [ ] Changé le `JWT_SECRET` pour une valeur aléatoire forte
- [ ] Utilisé MongoDB Atlas avec authentification
- [ ] Configuré `NODE_ENV=production`
- [ ] Activé HTTPS (SSL/TLS)
- [ ] Limité les requêtes avec rate limiting (optionnel)
- [ ] Configuré les CORS correctement
- [ ] Retiré les logs sensibles

---

## 🆘 Dépannage

### Erreur : `Cannot GET /`

**Cause** : Le frontend n'est pas buildé  
**Solution** : Exécuter `npm run build` avant `npm start`

### Erreur : MongoDB connection failed

**Cause** : URI MongoDB incorrecte  
**Solution** : Vérifier `MONGO_URI` dans `.env`

### Port déjà utilisé

**Cause** : Le port 5000 est occupé  
**Solution** : Changer `PORT` dans `.env` ou arrêter l'autre processus

---

## 📞 Support

Pour toute question, consulter le [README.md](./README.md) principal.
