// Ajoute un écouteur d'événement au bouton pour charger une nouvelle citation
document.addEventListener('DOMContentLoaded', function () {
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    if (!newQuoteBtn || !quoteElement || !authorElement) {
        // Un des éléments n'existe pas, on ne fait rien
        return;
    }

    let quotes = [];

    function displayRandomQuote() {
        if (!quotes.length) return;
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.querySelector('p').textContent = random.text;
        authorElement.textContent = random.author;
    }

    // Charger les citations depuis le fichier JSON
    fetch('assets/data/quotes.json')
        .then(response => response.json())
        .then(data => {
            quotes = data;
            displayRandomQuote();
        })
        .catch(() => {
            quoteElement.querySelector('p').textContent = "Impossible de charger les citations.";
            authorElement.textContent = "";
        });

    newQuoteBtn.addEventListener('click', displayRandomQuote);
});
