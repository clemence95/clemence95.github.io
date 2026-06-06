// Applique le thème AVANT le rendu de la page pour éviter tout flash de couleur.
// Volontairement minimal et synchrone (chargé sans "defer" dans le <head>).
(function () {
    try {
        var stored = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = stored || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-bs-theme", theme);
    } catch (e) {
        // En cas d'indisponibilité du localStorage, on reste sur le thème clair par défaut.
    }
})();
