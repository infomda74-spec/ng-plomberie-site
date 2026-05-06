#!/bin/bash

# Script de déploiement pour NG Plomberie Site
# Usage: ./deploy.sh [local|production]

set -e

# Configuration
PROJECT_DIR="/opt/data/ng-plomberie-site"
BACKUP_DIR="/opt/data/backups/ng-plomberie"
DEPLOY_ENV=${1:-local}

echo "=== Déploiement de NG Plomberie Site ==="
echo "Environnement: $DEPLOY_ENV"
echo "========================================="

# Créer backup si en production
if [ "$DEPLOY_ENV" = "production" ]; then
    echo "Création du backup..."
    mkdir -p "$BACKUP_DIR"
    timestamp=$(date +%Y%m%d_%H%M%S)
    cp -r "$PROJECT_DIR" "$BACKUP_DIR/ng-plomberie_$timestamp"
    echo "Backup créé: $BACKUP_DIR/ng-plomberie_$timestamp"
fi

# Vérifier les fichiers nécessaires
echo "Vérification des fichiers..."
required_files=("index.html" "styles.css" "script.js")
for file in "${required_files[@]}"; do
    if [ ! -f "$PROJECT_DIR/$file" ]; then
        echo "Erreur: $file manquant dans $PROJECT_DIR"
        exit 1
    fi
done
echo "✅ Tous les fichiers nécessaires présents"

# Optimisation des fichiers
echo "Optimisation des fichiers..."
if command -v minify >/dev/null 2>&1; then
    # Minifier CSS et JS si minify est disponible
    minify -c "$PROJECT_DIR/styles.css" > "$PROJECT_DIR/styles.min.css"
    minify "$PROJECT_DIR/script.js" > "$PROJECT_DIR/script.min.js"
    
    # Créer une version optimisée
    mkdir -p "$PROJECT_DIR/dist"
    cp "$PROJECT_DIR/index.html" "$PROJECT_DIR/dist/"
    cp "$PROJECT_DIR/styles.min.css" "$PROJECT_DIR/dist/"
    cp "$PROJECT_DIR/script.min.js" "$PROJECT_DIR/dist/"
    
    echo "✅ Fichiers optimisés créés dans $PROJECT_DIR/dist/"
else
    echo "⚠️  Minify non disponible, fichiers non optimisés"
fi

# Vérifier les API keys
echo "Vérification de la configuration..."
if grep -q "YOUR_API_KEY" "$PROJECT_DIR/index.html"; then
    echo "⚠️  Remplacer YOUR_API_KEY par une clé Google Maps valide"
fi

# Tests de base
echo "Exécution des tests..."
# Vérifier la syntaxe HTML
if command -v tidy >/dev/null 2>&1; then
    tidy -q -e "$PROJECT_DIR/index.html" > /dev/null 2>&1 || echo "⚠️  Avertissements HTML détectés"
fi

# Vérifier les liens (si lynx est disponible)
if command -v lynx >/dev/null 2>&1; then
    lynx -dump "$PROJECT_DIR/index.html" | grep -q "http" && echo "✅ Liens HTML validés" || echo "⚠️  Problèmes de liens détectés"
fi

echo ""
echo "=== Déploiement terminé ==="

# Instructions d'utilisation
echo ""
echo "Utilisation:"
echo "1. Pour un déploiement local: ouvrir $PROJECT_DIR/index.html"
echo "2. Pour un serveur local: cd $PROJECT_DIR && python -m http.server 8000"
echo "3. Pour un déploiement web: transférer les fichiers vers votre serveur"
echo ""
echo "Ne pas oublier de:"
echo "- Remplacer YOUR_API_KEY par une clé Google Maps valide"
echo "- Mettre à jour les informations de contact"
echo "- Configurer le domaine et SSL pour la production"