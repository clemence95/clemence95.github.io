// Code pour le basculement de thème (clair/sombre) basé sur les préférences de l'utilisateur.
// Cette logique est courante et inspirée des pratiques standard avec localStorage et matchMedia.
// Exécute le code une fois que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Récupère le bouton de basculement du thème et le style pour le mode sombre
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const darkModeStyle = document.getElementById('dark-mode-style');

    // Fonction pour mettre à jour l'icône du bouton
    const updateButtonIcon = (isDark) => {
        toggleBtn.textContent = isDark ? '🌞' : '🌙'; // Soleil = clair, Lune = sombre
    };

    // Fonction pour activer/désactiver le thème
    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        darkModeStyle.disabled = !isDark;
        document.documentElement.setAttribute('data-bs-theme', theme); // <-- Ajouté
        localStorage.setItem('theme', theme);
        updateButtonIcon(isDark);
    };

    // Gestion du clic sur le bouton
    toggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = !darkModeStyle.disabled;
        setTheme(isCurrentlyDark ? 'light' : 'dark');
    });

    // Initialisation : lire la préférence enregistrée OU celle du système
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});
