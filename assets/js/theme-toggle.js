document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const darkModeStyle = document.getElementById('dark-mode-style');
    const resetBtn = document.getElementById('reset-theme-btn');

    // Fonction pour mettre à jour l'icône du bouton
    const updateButtonIcon = (isDark) => {
        toggleBtn.textContent = isDark ? '🌞' : '🌙';
        toggleBtn.setAttribute('aria-pressed', isDark.toString());
    };

    // Fonction pour activer/désactiver le thème
    const setTheme = (theme, persist = true) => {
        document.documentElement.classList.add('theme-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);

        const isDark = theme === 'dark';
        darkModeStyle.disabled = !isDark;
        document.documentElement.setAttribute('data-bs-theme', theme);
        if (persist) {
            localStorage.setItem('theme', theme);
        }
        if (toggleBtn) updateButtonIcon(isDark);
    };

    // Applique le thème enregistré ou celui du système
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    // Cacher le bouton de bascule si un thème est déjà défini
    if (savedTheme && toggleBtn) {
        toggleBtn.style.display = 'none';
    }

    // Gestion du clic sur le bouton pour basculer manuellement
    if (toggleBtn && !savedTheme) {
        toggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = !darkModeStyle.disabled;
            setTheme(isCurrentlyDark ? 'light' : 'dark');
        });
    }

    // Réagit aux changements système UNIQUEMENT si aucun thème n'est stocké
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light', false);
        }
    });

    // Bouton de réinitialisation (s'il existe)
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light', false);
            if (toggleBtn) toggleBtn.style.display = 'inline-block'; // Ré-affiche le bouton
        });
    }
});


