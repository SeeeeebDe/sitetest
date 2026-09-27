# API de Satisfaction - Stockage Centralisé

Ce document explique comment configurer et utiliser le nouveau système de stockage centralisé pour les réponses de l'enquête de satisfaction.

## 🔄 Changements Apportés

### Avant
- Les réponses étaient stockées localement dans le navigateur (localStorage)
- Pas de centralisation des données
- Difficile de gérer les statistiques globales

### Après
- Les réponses sont stockées sur votre serveur
- Centralisation complète des données
- Gestion sécurisée avec limitation par IP
- API REST pour toutes les opérations

## 📁 Fichiers Créés/Modifiés

### Nouveaux Fichiers
1. **`/public/api/satisfaction.php`** - API PHP pour gérer les données
2. **`/src/services/satisfactionAPI.js`** - Service JavaScript pour les appels API
3. **`/public/api/satisfaction_data.json`** - Fichier de données (créé automatiquement)

### Fichiers Modifiés
1. **`/src/pages/Satisfaction.jsx`** - Utilise maintenant l'API
2. **`/src/pages/SatisfactionStats.jsx`** - Charge les données depuis l'API
3. **`/src/pages/SatisfactionManage.jsx`** - Gère les données via l'API

## 🚀 Configuration

### 1. Vérification du Support PHP
Assurez-vous que votre hébergement OVHcloud supporte PHP (version 7.4 ou supérieure recommandée).

### 2. Permissions de Fichiers
Le dossier `/public/api/` doit avoir les permissions d'écriture pour que PHP puisse créer et modifier le fichier de données.

```bash
# Sur votre serveur, définir les permissions
chmod 755 /public/api/
chmod 644 /public/api/satisfaction.php
```

### 3. Test de l'API
Après déploiement, testez l'API en accédant à :
```
https://votre-domaine.com/api/satisfaction.php?action=check_limit
```

Vous devriez recevoir une réponse JSON comme :
```json
{"canSubmit": true}
```

## 🔒 Sécurité

### Limitation par IP
- Une seule réponse par IP par jour
- Vérification automatique côté serveur

### Authentification
- Mot de passe requis pour accéder aux statistiques et à la gestion
- Mot de passe actuel : `ajGXd8MyHTSqi36`

### Protection des Données
- Validation stricte des données côté serveur
- Limitation de la taille du fichier (10MB max)
- Échappement automatique des caractères spéciaux

## 📊 Fonctionnalités

### Pour les Utilisateurs
- **Soumission** : Les réponses sont envoyées directement sur votre serveur
- **Limitation** : Impossible de soumettre plusieurs fois par jour
- **Validation** : Vérification complète des données avant sauvegarde

### Pour l'Administration
- **Statistiques** : Accès aux données centralisées en temps réel
- **Gestion** : Suppression et modification des réponses
- **Export** : Données au format JSON facilement exportables

## 🛠️ API Endpoints

### GET /api/satisfaction.php
**Vérifier la limite quotidienne :**
```
GET /api/satisfaction.php?action=check_limit
Réponse: {"canSubmit": true/false}
```

**Récupérer les données (authentifié) :**
```
GET /api/satisfaction.php?password=VOTRE_MOT_DE_PASSE
Réponse: [array of survey responses]
```

### POST /api/satisfaction.php
**Soumettre une réponse :**
```json
{
  "firstName": "Prénom",
  "massageDate": "2024-01-15",
  "responses": {
    "communication": 5,
    "attentes": 4,
    "massage": 5,
    "intimite": 5,
    "domicile": 4,
    "satisfaction": 5
  },
  "feedback": "Commentaire optionnel"
}
```

### DELETE /api/satisfaction.php
**Supprimer des réponses (authentifié) :**
```json
{
  "ids": ["survey_id1", "survey_id2"]
}
```

## 📈 Structure des Données

Chaque réponse est stockée avec :
```json
{
  "id": "survey_unique_id",
  "firstName": "Prénom",
  "massageDate": "2024-01-15",
  "responses": {
    "communication": 5,
    "attentes": 4,
    "massage": 5,
    "intimite": 5,
    "domicile": 4,
    "satisfaction": 5
  },
  "feedback": "Commentaire",
  "timestamp": "2024-01-15T10:30:00+00:00",
  "ip": "192.168.1.1"
}
```

## 🔧 Maintenance

### Sauvegarde
Le fichier `/public/api/satisfaction_data.json` contient toutes les données. Sauvegardez-le régulièrement.

### Nettoyage
Pour supprimer toutes les données :
```bash
rm /public/api/satisfaction_data.json
```

### Monitoring
Surveillez la taille du fichier de données. Si il dépasse 10MB, l'API refusera les nouvelles soumissions.

## 🚨 Dépannage

### Erreur 500
- Vérifiez les permissions du dossier `/public/api/`
- Vérifiez que PHP est activé sur votre hébergement
- Consultez les logs d'erreur de votre serveur

### Erreur 401 (Accès non autorisé)
- Vérifiez le mot de passe dans les fichiers de statistiques
- Le mot de passe doit être identique dans tous les fichiers

### Données non sauvegardées
- Vérifiez que l'URL de l'API est correcte
- Testez l'endpoint de vérification de limite
- Vérifiez la console du navigateur pour les erreurs JavaScript

## 📞 Support

En cas de problème :
1. Vérifiez les logs de votre serveur
2. Testez l'API manuellement
3. Vérifiez les permissions de fichiers
4. Contactez le support de votre hébergeur si nécessaire

---

**Note :** Ce système remplace complètement le stockage local. Les anciennes données stockées dans localStorage ne seront plus accessibles après cette mise à jour.