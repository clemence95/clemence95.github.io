document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".filter-item");

  if (!buttons.length || !items.length) return;

  function applyFilter(category) {
    items.forEach((item) => {
      const itemCategory = item.dataset.category || "";

      const shouldShow = category === "all" || itemCategory === category;

      // Important : ne pas casser bootstrap grid
      item.style.display = shouldShow ? "" : "none";
    });
  }

  function setActiveButton(activeButton) {
    buttons.forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.setAttribute("aria-pressed", "false");
    });

    activeButton.classList.add("btn-primary");
    activeButton.setAttribute("aria-pressed", "true");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category || "all";

      applyFilter(category);
      setActiveButton(button);
    });
  });

  // filtre initial
  const defaultBtn = document.querySelector('.filter-btn[data-category="all"]');
  if (defaultBtn) {
    setActiveButton(defaultBtn);
    applyFilter("all");
  }
});
