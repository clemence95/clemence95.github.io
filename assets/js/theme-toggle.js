// Code pour le basculement de thème (clair/sombre) basé sur les préférences de l'utilisateur.
// Cette logique est courante et inspirée des pratiques standard avec localStorage et matchMedia.
// Exécute le code une fois que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Récupère le bouton de basculement du thème et le style pour le mode sombre
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const darkModeStyle = document.getElementById('dark-mode-style');

    // Fonction pour mettre à jour l'icône du bouton
    const updateButtonIcon = (isDark) => {
        toggleBtn.textContent = isDark ? '🌞' : '🌙';
        toggleBtn.setAttribute('aria-pressed', isDark.toString());
    };

    // Fonction pour activer/désactiver le thème
    const setTheme = (theme) => {
        // Ajoute la classe de transition pour une animation douce
        document.documentElement.classList.add('theme-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);

        const isDark = theme === 'dark';
        darkModeStyle.disabled = !isDark;
        document.documentElement.setAttribute('data-bs-theme', theme);
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
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (userPrefersDark ? 'dark' : 'light'));

    // Réagit au changement de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Ajout du bouton de réinitialisation du thème si présent
    const resetBtn = document.getElementById('reset-theme-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem('theme');
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        });
    }
});
