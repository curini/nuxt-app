# Test of Navitia API

## 🚀 Introduction

Ce projet est un petit test d’intégration de l’API **Navitia / SNCF** permettant d’interroger des données de transport (itinéraires, lieux, départs, etc.) avec **Nuxt**.

- **Nuxt 4.4.2** (framework Vue.js)
- **TypeScript**

## 🔑 Obtention de la clé API

Pour utiliser l’API, tu dois d’abord demander une clé d’authentification :

👉 [https://numerique.sncf.com/startup/api/token-developpeur/](https://numerique.sncf.com/startup/api/token-developpeur/)

Tu recevras ensuite un email contenant :

- ta **clé API**
- l’**URL de base** de ton instance Navitia
- des exemples d’appels

Exemple de contenu du mail :

```
Merci de vous être inscrit à l’API SNCF. Voici votre clé d’authentification :

YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY

Comment vous authentifier à l'API ?
Accédez à l'API : https://XXXXX/v1
Username : copiez puis collez votre clé
Password : laissez le champ vide

ou copiez votre clé directement dans l'URL.

Exemples :

Modes de transport :
GET https://XXXXX/v1/coverage/sncf/commercial_modes

Itinéraire Paris → Lyon :
GET https://XXXXX/v1/coverage/sncf/journeys?from=admin:fr:75056&to=admin:fr:69123&datetime=20260401T100936

Prochains départs à Montparnasse :
GET https://XXXXX/v1/coverage/sncf/stop_areas/stop_area:SNCF:87391003/departures?datetime=20260401T100936
```

## ⚙️ Configuration du projet

Ajoute ta clé et ton URL dans un fichier `.env` à la racine :

```
NAVITIA_TOKEN=YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY
NAVITIA_URL=https://XXXXX/v1
```

## ▶️ Lancement du projet

Installe les dépendances puis démarre le serveur local :

```bash
npm install
npm run dev
```

## 📚 Fonctionnalités utilisées

Ce projet utilise principalement :

- **journeys** → calcul d’itinéraires
- **places** → recherche de lieux (gares, arrêts, villes, POI…)
