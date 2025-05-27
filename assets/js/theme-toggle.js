document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const darkModeStyle = document.getElementById('dark-mode-style');

    const updateButtonIcon = (isDark) => {
        toggleBtn.textContent = isDark ? '🌞' : '🌙';
        toggleBtn.setAttribute('aria-pressed', isDark.toString());
    };

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
        updateButtonIcon(isDark);
    };

    // Applique le thème enregistré ou le thème clair par défaut
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
    } else {
        setTheme('light'); // Thème par défaut
    }

    // Toujours permettre le changement de thème
    toggleBtn.addEventListener('click', () => {
        const currentTheme = !darkModeStyle.disabled ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Réagit au changement de thème système si aucun thème n'est défini manuellement
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            setTheme(e.matches ? 'dark' : 'light', false);
        }
    });

    // Gestion du soleil/nuages qui montent et disparaissent selon le scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? scrollY / docHeight : 0;

        // Applique la montée à partir de 80% du scroll
        document.body.classList.toggle('sky-hide-section', ratio > 0.8);
        // Disparition totale en bas de page
        document.body.classList.toggle('sky-hide-final', ratio > 0.97);

        // Met à jour la variable CSS pour la montée
        if (ratio > 0.8) {
            document.documentElement.style.setProperty('--sky-hide', `-${Math.round(300 * Math.max(0, (ratio - 0.8) / 0.2))}px`);
        } else {
            document.documentElement.style.setProperty('--sky-hide', '0');
        }
    });
});

