  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.filter-item');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        items.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category').includes(category)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        buttons.forEach(btn => btn.classList.remove('btn-primary'));
        button.classList.add('btn-primary');
      });
    });
  });