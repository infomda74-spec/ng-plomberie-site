# NG Plomberie - Site Web Professionnel

Un site web moderne et professionnel pour l'entreprise NG Plomberie, conçu avec des tons éco-friendly et une approche moderne.

## 🚀 Mises à Jour Récentes

### ✨ Améliorations Clés
- **Photos Réalistes**: Remplacement des images Unsplash par des SVG personnalisés
- **Schéma d'Organisation**: Ajout d'un organigramme interactif complet
- **Images sur Mesure**: Création de 5 images SVG dédiées aux réalisations
- **Navigation Élargie**: Ajout de la section "Organisation" dans le menu

### 📁 Nouvelle Structure
```
/opt/data/ng-plomberie-site/
├── index.html          # Page principale (mise à jour)
├── styles.css          # Styles CSS + styles organisation
├── script.js           # JavaScript fonctionnalités
├── images/             # NOUVEAU: Dossier images personnalisées
│   ├── logo.svg        # Logo NG Plomberie
│   ├── salle-de-bain.svg  # Réalisation salle de bain
│   ├── chaudiere.svg   # Installation chaudière
│   ├── cuisine.svg     # Plomberie cuisine
│   └── organigramme.svg # Schéma d'organisation
└── README.md           # Documentation (mise à jour)
```

## Caractéristiques

### 🎨 Design
- **Theme Éco-friendly**: Utilisation de tons verts et naturels
- **Design Moderne**: Interface professionnelle et intuitive
- **Responsive**: Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Animations Fluides**: Effets de parallaxe, animations au scroll
- **Typography**: Police Poppins moderne et lisible
- **Images Personnalisées**: SVG sur mesure pour une identité visale unique

### 🔧 Fonctionnalités
- **Navigation Sticky**: Menu fixe avec effets au scroll
- **Section Services**: Présentation détaillée des services de plomberie
- **Galerie Réalisations**: Photos réalistes et professionnelles
- **Organigramme Interactif**: Structure complète de l'entreprise
- **Formulaire de Contact**: Validation complète et gestion des soumissions
- **Google Maps**: Intégration de cartes pour localisation
- **Compteurs Animés**: Statistiques dynamiques
- **Design Mobile**: Menu hamburger pour mobile
- **SEO Optimisé**: Structure sémantique et meta tags
- **FAQ Interactive**: Système de questions/réponses dynamique

### 📱 Services Présentés
- Plomberie Générale
- Chauffage
- Sanitaire
- Dépannage 24/7
- Éco Solutions
- Certification RGE

### 🛠️ Technologies Utilisées
- **HTML5**: Sémantique et accessibilité
- **CSS3**: Flexbox, Grid, animations CSS
- **JavaScript ES6+**: Fonctionnalités interactives
- **Google Maps API**: Intégration de cartes
- **Font Awesome**: Icônes vectorielles
- **Google Fonts**: Typography moderne

## Structure du Projet

```
/opt/data/ng-plomberie-site/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # JavaScript fonctionnalités
└── README.md           # Documentation
```

## Installation et Utilisation

### 1. Cloner ou téléposer les fichiers
```bash
# Si vous avez les fichiers localement
cp -r /opt/data/ng-plomberie-site /chemin/de/votre/projet/

# Ou accéder directement au dossier
cd /opt/data/ng-plomberie-site/
```

### 2. Configurer Google Maps (optionnel)
Pour activer la fonctionnalité de carte Google Maps:

1. Rendez-vous sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez-en un existant
3. Activez l'API "Maps JavaScript API"
4. Créez une clé API
5. Remplacez `YOUR_API_KEY` dans `index.html` ligne 13:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=VOTRE_CLÉ_API&libraries=places" async defer></script>
```

### 3. Personnaliser les informations
Modifier les informations dans `index.html`:
- Coordonnées de l'entreprise
- Numéros de téléphone
- Email
- Adresse
- Horaires d'ouverture

### 4. Lancer le site
```bash
# Ouvrir directement dans le navigateur
open index.html

# Ou utiliser un serveur local (Python)
python -m http.server 8000
```

## Personnalisation

### Couleurs Thème
Les couleurs sont définies dans les variables CSS:
```css
:root {
    --primary-color: #2d5016;     /* Vert foncé */
    --secondary-color: #4a7c59;   /* Vert moyen */
    --accent-color: #7cb342;      /* Vert clair */
    --light-green: #a5d6a7;       /* Vert très clair */
    --dark-green: #1b5e20;        /* Vert très foncé */
}
```

### Services Personnalisés
Modifier les services dans la section "Nos Services" dans `index.html`:
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-tint"></i>
    </div>
    <h3>Titre du Service</h3>
    <p>Description détaillée du service offert.</p>
</div>
```

### Formulaire de Contact
Le formulaire inclut validation JavaScript et gestion des erreurs. Les champs sont:
- Nom (obligatoire)
- Email (obligatoire)
- Téléphone (optionnel)
- Service (obligatoire)
- Message (obligatoire)

## Fonctionnalités JavaScript

### Navigation
- Menu responsive avec hamburger
- Effets de scroll pour le menu
- Navigation smooth

### Formulaires
- Validation complète
- Messages d'erreur utilisateur
- Simuler l'envoi de formulaire
- Formatage automatique du téléphone

### Animations
- Compteurs animés pour les statistiques
- Animations au scroll (Intersection Observer)
- Effets hover sur les boutons et cartes
- Animations CSS fluides

### Carte Google Maps
- Intégration simple
- Marqueur personnalisé
- Styles personnalisés

## Performance et Accessibilité

### Performance
- Code optimisé et compressé
- Lazy loading pour images
- Debouncing pour les événements
- CSS optimisé

### Accessibilité
- Sémantique HTML5
- Navigation au clavier
- Labels ARIA pour formulaires
- Contraste couleurs conforme WCAG

## Navigateurs Supportés
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Déploiement

### Pour un déploiement web:
1. Héberger les fichiers sur un serveur web
2. Configurer le domaine DNS
3. Configurer SSL (HTTPS recommandé)
4. Mettre à jour les API keys si nécessaire

### Pour un déploiement local:
- Ouvrir simplement `index.html` dans un navigateur
- Utiliser `python -m http.server 8000` pour un serveur local

## Maintenance

### Mises à jour régulières
- Vérifier la validité du Google Maps API key
- Mettre à jour les informations de contact
- Actualiser les services et tarifs
- Vérifier les liens morts

### Sécurité
- Ne jamais exposer les API keys en production
- Valider toutes les données utilisateur
- Utiliser HTTPS en production
- Sauvegarder régulièrement le code source

## Contact

Pour toute question ou support concernant ce site web:
- Email: contact@ng-plomberie.fr
- Téléphone: 01 23 45 67 89
- Site: ng-plomberie.fr

---

Créé avec 💚 pour NG Plomberie
Design moderne et éco-friendly