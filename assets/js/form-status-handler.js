// Exécute ce code une fois que le DOM (structure HTML) est complètement chargé
document.addEventListener("DOMContentLoaded", () => {

    // Récupère les paramètres de l'URL (ex: ?status=success)
    const urlParams = new URLSearchParams(window.location.search);

    // Récupère la valeur du paramètre "status" dans l'URL
    const status = urlParams.get('status');

    // Cible l'élément HTML qui affichera le message de retour du formulaire
    const formMessage = document.getElementById('form-message');

    // Si aucun élément avec l'ID "form-message" n'est trouvé, on arrête ici
    if (!formMessage) return;

    // Si le paramètre "status" vaut "success", on affiche un message de confirmation
    if (status === 'success') {
        formMessage.textContent = '✅ Votre message a été envoyé avec succès !';     // Texte à afficher
        formMessage.className = 'alert alert-success';                               // Style Bootstrap pour succès
        formMessage.classList.remove('d-none');                                      // Rendre l'alerte visible
    } 
    // Si le paramètre "status" vaut "error", on affiche un message d'erreur
    else if (status === 'error') {
        formMessage.textContent = '❌ Une erreur est survenue. Veuillez réessayer.'; // Texte à afficher
        formMessage.className = 'alert alert-danger';                                // Style Bootstrap pour erreur
        formMessage.classList.remove('d-none');                                      // Rendre l'alerte visible
    }

    // Nettoie l'URL en supprimant les paramètres après affichage du message
    // Cela évite que le message réapparaisse si l'utilisateur rafraîchit la page
    window.history.replaceState({}, document.title, window.location.pathname);
});
