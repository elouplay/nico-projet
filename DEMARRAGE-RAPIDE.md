# 🚀 CalorieVision - Démarrage Rapide

## ✅ Architecture Simplifiée

**Un seul serveur Node.js** sur le port **5000** qui sert :
- 🔌 API REST → `http://localhost:5000/api/*`
- 🌐 Frontend React → `http://localhost:5000`

---

## 📦 Installation (une seule fois)

```bash
cd calorie-vision
npm run install-all
```

---

## ⚙️ Configuration MongoDB

Éditer `server/.env` :

```env
MONGO_URI=mongodb://localhost:27017/calorie-vision
# Ou MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/calorie-vision
```

---

## 🏃 Démarrage

### **Mode Production** (recommandé)

```bash
npm start
```

✅ L'application sera sur : **http://localhost:5000**

> ⚠️ Si erreur `EADDRINUSE`, le port 5000 est déjà utilisé.  
> Arrêtez l'autre processus ou changez `PORT` dans `server/.env`

### **Mode Développement** (avec hot-reload)

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

Frontend sur http://localhost:5173 (proxy vers API 5000)

---

## 📂 Ce que fait `npm start`

1. Build le frontend React → `client/dist/`
2. Lance le serveur Node.js
3. Le serveur sert :
   - Routes API : `/api/*`
   - Fichiers statiques React : tout le reste

---

## ✅ Vérification

1. **API** : http://localhost:5000/api  
   Retourne : `{"message": "API CalorieVision est en ligne ✅"}`

2. **Frontend** : http://localhost:5000  
   Affiche l'interface de connexion

---

## 🐛 Dépannage

### Port 5000 déjà utilisé

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Ou changer le port dans server/.env
PORT=3000
```

### MongoDB non connecté

Vérifier que MongoDB tourne :
```bash
mongod
```

Ou utiliser MongoDB Atlas (gratuit) : https://cloud.mongodb.com

### Rebuild nécessaire

```bash
cd client
npm run build
```

---

## 🌐 Déploiement

Voir [DEPLOIEMENT.md](./DEPLOIEMENT.md) pour Heroku, Render, Docker, etc.

---

C'est tout ! Un seul serveur, un seul port, super simple ! 🎉
