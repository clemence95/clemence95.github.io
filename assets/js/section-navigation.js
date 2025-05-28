document.addEventListener("DOMContentLoaded", () => {
    // Ne sélectionne que les sections enfants directs de <main>
    const main = document.querySelector("main");
    const sections = main ? main.querySelectorAll("section") : [];
    const nextBtn = document.getElementById("next-section");
    const prevBtn = document.getElementById("prev-section");
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    let current = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.add("d-none", "opacity-0");
            section.classList.remove("d-block", "opacity-1", "active");
        });
        sections[index].classList.remove("d-none", "opacity-0");
        sections[index].classList.add("d-block", "opacity-1", "active");
        current = index;
        window.scrollTo({ top: 0, behavior: "smooth" }); // <-- Ajout pour revenir en haut
    }

    if (sections.length === 0) return;

    showSection(current);

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (current < sections.length - 1) {
                showSection(current + 1);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (current > 0) {
                showSection(current - 1);
            }
        });
    }

    // Navigation via la navbar
    navLinks.forEach((link, idx) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                // Trouve l'index de la section correspondante
                const targetId = href.replace("#", "");
                const targetIndex = Array.from(sections).findIndex(
                    section => section.id === targetId
                );
                if (targetIndex !== -1) {
                    showSection(targetIndex);
                }
                // Ferme le menu mobile si besoin
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
});
