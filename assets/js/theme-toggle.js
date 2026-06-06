// Gère le bouton de bascule clair / sombre et mémorise le choix de l'utilisateur.
document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const icon = toggle.querySelector("i");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function apply(theme) {
        html.setAttribute("data-bs-theme", theme);

        // Icône : lune en mode clair (pour passer en sombre), soleil en mode sombre.
        if (icon) {
            icon.classList.toggle("fa-moon", theme === "light");
            icon.classList.toggle("fa-sun", theme === "dark");
        }

        toggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"
        );
        toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");

        if (themeColorMeta) {
            themeColorMeta.setAttribute("content", theme === "dark" ? "#1a1d2e" : "#0d6efd");
        }
    }

    // Synchronise l'affichage avec le thème déjà posé par theme-init.js.
    apply(html.getAttribute("data-bs-theme") || "light");

    toggle.addEventListener("click", () => {
        const next = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        try {
            localStorage.setItem("theme", next);
        } catch (e) {
            // Choix non mémorisé si le stockage est indisponible — la bascule fonctionne quand même.
        }
        apply(next);
    });
});
