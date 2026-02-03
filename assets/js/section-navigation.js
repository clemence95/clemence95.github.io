document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const sections = main ? Array.from(main.querySelectorAll(":scope > section")) : [];
    const nextBtn = document.getElementById("next-section");
    const prevBtn = document.getElementById("prev-section");
    const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link"));

    if (!sections.length) return;

    let current = 0;

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    function setActiveNav(targetId) {
        navLinks.forEach((a) => {
            const href = a.getAttribute("href") || "";
            const isActive = href === `#${targetId}`;
            a.classList.toggle("active", isActive);
            a.setAttribute("aria-current", isActive ? "page" : "false");
        });
    }

    function updateButtons() {
        if (prevBtn) prevBtn.disabled = current <= 0;
        if (nextBtn) nextBtn.disabled = current >= sections.length - 1;
    }

    function showSection(index, { updateHash = true, scrollTop = true } = {}) {
        index = clamp(index, 0, sections.length - 1);

        sections.forEach((section, i) => {
            const isTarget = i === index;
            section.classList.toggle("d-none", !isTarget);
            section.classList.toggle("active", isTarget);
        });

        current = index;

        const targetId = sections[current].id || "";
        if (targetId) {
            setActiveNav(targetId);

            if (updateHash) {
                history.replaceState(null, "", `#${targetId}`);
            }
        }

        updateButtons();

        if (scrollTop) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function findIndexByHash(hash) {
        const id = (hash || "").replace("#", "");
        if (!id) return -1;
        return sections.findIndex((s) => s.id === id);
    }

    function closeMobileNavbarIfOpen() {
        const navbarCollapse = document.querySelector(".navbar-collapse.show");
        if (!navbarCollapse) return;

        if (window.bootstrap && window.bootstrap.Collapse) {
            const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
            bsCollapse.hide();
        } else {
            navbarCollapse.classList.remove("show");
        }
    }

    const initialIndex = findIndexByHash(window.location.hash);
    showSection(initialIndex !== -1 ? initialIndex : 0, { updateHash: initialIndex !== -1 });

    nextBtn?.addEventListener("click", () => showSection(current + 1));
    prevBtn?.addEventListener("click", () => showSection(current - 1));

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href") || "";
            if (!href.startsWith("#")) return;

            e.preventDefault();

            const targetIndex = findIndexByHash(href);
            if (targetIndex !== -1) showSection(targetIndex);

            closeMobileNavbarIfOpen();
        });
    });

    window.addEventListener("hashchange", () => {
        const idx = findIndexByHash(window.location.hash);
        if (idx !== -1) showSection(idx, { updateHash: false });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") showSection(current + 1);
        if (e.key === "ArrowLeft") showSection(current - 1);
    });
});
