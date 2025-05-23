# 🌟 Portfolio de Clémence Boitelle  
![Droits réservés](https://img.shields.io/badge/%C2%A9-Clémence%20Boitelle-blue)

Bienvenue sur mon portfolio ! Ce site présente mon parcours, mes compétences et mes projets en développement web.  

🔗 **Lien du portfolio** : [clemence95.github.io/PortFolio](https://clemence95.github.io/PortFolio/)  

---

## 🚀 À propos du projet  

Ce portfolio est une **application web statique** développée en **HTML, CSS et Bootstrap**. Il est conçu pour être **totalement responsive**, permettant une navigation fluide sur mobile, tablette et ordinateur.  

💡 **Points clés** :  
- 🌐 Site entièrement **déployé sur GitHub Pages**  
- 🎨 **Design moderne et responsive** grâce à **Bootstrap 5**  
- 🌙 **Mode sombre** avec persistance des préférences utilisateur  
- 📩 **Formulaire de contact fonctionnel** avec [FormSubmit.co](https://formsubmit.co/)  
- 🚀 **Gratuit et accessible à tous**  

---

## 📌 Fonctionnalités  

✔️ **Présentation** : Une introduction sur mon parcours et mes objectifs professionnels  
✔️ **Compétences** : Liste des technologies et outils que je maîtrise  
✔️ **Projets** : Aperçu de mes réalisations académiques et personnelles  
✔️ **Formulaire de contact** : Permet aux visiteurs de m'envoyer des messages via **FormSubmit.co**, avec validation des champs et protection anti-bot (honeypot)  
✔️ **Mode sombre** : Basculer entre les thèmes clair et sombre avec mémorisation des préférences  
✔️ **Citation du jour** : Chargement dynamique de citations avec gestion des erreurs réseau  

---

## 🛠️ Technologies utilisées  

- **HTML5 & CSS3**  
- **Bootstrap 5** pour la mise en page et la responsivité  
- **FontAwesome** pour les icônes  
- **JavaScript** pour les interactions dynamiques (mode sombre, validation de formulaire, etc.)  
- **FormSubmit.co** pour la gestion des envois du formulaire de contact  
- **GitHub Pages** pour l'hébergement  

---

## 📩 Formulaire de Contact  

Le formulaire de contact utilise **FormSubmit.co** pour envoyer les messages directement à mon adresse email. Aucune base de données ni backend n'est nécessaire.  

💡 **Protection anti-bot** :  
- Un champ caché (honeypot) est inclus dans le formulaire pour empêcher les soumissions automatisées.  
- Les bots qui remplissent ce champ verront leur soumission rejetée.  

💡 **Validation des champs** :  
- Les champs sont validés côté client pour garantir des entrées correctes (nom, email, téléphone, message).  
- Les caractères spéciaux non autorisés comme `<` et `>` sont bloqués pour éviter les injections.  

---

## 🚀 Déploiement  

Le site est hébergé gratuitement sur **GitHub Pages**. Pour le mettre à jour :  
1. Poussez les modifications sur la branche `main` ou `gh-pages`.  
2. GitHub Pages mettra automatiquement le site à jour.  

💡 **Astuces pour personnaliser** :  
- Vous pouvez modifier le CSS dans `style.css` pour changer les couleurs et la mise en page.  
- Le contenu des sections est dans le fichier **HTML principal** (`index.html`).  

---

## 💡 Idées d'améliorations  

🔹 Ajouter des **tests unitaires** pour les scripts JavaScript  
🔹 Intégrer des **animations CSS supplémentaires** pour une expérience plus dynamique  
🔹 Créer une section **blog** pour partager mon parcours et mes apprentissages  
🔹 Ajouter une **API externe** pour enrichir les fonctionnalités (ex. météo, actualités)  

---

## 🔐 Sécurité du site

Ce site a été conçu avec plusieurs bonnes pratiques pour limiter les risques de failles XSS (Cross-Site Scripting) et améliorer la sécurité globale :

- ✅ Aucun script inline dans le HTML (tous les scripts sont dans des fichiers `.js`)
- ✅ Utilisation de `textContent` au lieu de `innerHTML` pour éviter les injections de code
- ✅ Politique de sécurité du contenu (CSP) définie pour limiter les sources de scripts, styles et polices
- ✅ Le formulaire de contact ne stocke aucune donnée et est protégé contre les soumissions automatisées
- ✅ Validation des champs de formulaire pour éviter les caractères spéciaux non autorisés
- ✅ Gestion des erreurs réseau pour le chargement des citations

🛡️ Mon objectif est d'assurer un site propre, sûr, et respectueux de la vie privée des visiteurs.

---

## 📬 Contact  

Si vous souhaitez me contacter, utilisez le [formulaire de contact](https://clemence95.github.io/PortFolio/#contact) ou écrivez-moi directement à **boitelleclemence@outlook.fr**.  

💻 **Portfolio** : [clemence95.github.io/PortFolio](https://clemence95.github.io/PortFolio/)  
📧 **Email** : boitelleclemence@outlook.fr  

---

## ⚠️ Conditions d’utilisation

Ce portfolio a été réalisé par Clémence Boitelle à des fins personnelles et professionnelles.  
Le code, le contenu et le design ne sont **pas libres de droits**.

❌ Toute réutilisation, copie ou publication sans mon autorisation explicite est interdite.  
✅ Vous pouvez vous en inspirer à titre pédagogique, avec mention de l’auteure.

Merci de respecter mon travail. 💙
