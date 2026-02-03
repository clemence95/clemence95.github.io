// assets/js/year.js
document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
});
