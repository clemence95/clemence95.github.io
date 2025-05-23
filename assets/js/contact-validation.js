// Inspiré de pratiques courantes pour la validation de formulaire en JavaScript.
// Ce code utilise des méthodes standard pour récupérer et valider les champs de formulaire.

// Ajout d'un écouteur d'événement pour exécuter le script une fois le DOM chargé
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) {
        console.error("Le formulaire de contact n'a pas été trouvé.");
        return;
    }

    // Messages d'erreur centralisés
    const errorMessages = {
        name: "Veuillez entrer un nom valide (2 à 50 caractères).",
        email: "Veuillez entrer une adresse email valide.",
        phone: "Veuillez entrer un numéro de téléphone valide (10 à 15 chiffres).",
        message: "Le message doit contenir entre 10 et 500 caractères.",
        specialChars: "Les caractères spéciaux comme '<' et '>' ne sont pas autorisés."
    };

    // Centralisation des expressions régulières
    const regexPatterns = {
        name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[0-9+\s()-]+$/,
        message: /^.{10,500}$/
    };

    // Ajout de messages d'erreur pour les champs vides
    const emptyFieldMessages = {
        name: "Le champ nom est requis.",
        email: "Le champ email est requis.",
        phone: "Le champ téléphone est requis.",
        message: "Le champ message est requis."
    };

    // Fonction de validation générique
    function validateField(value, regex, errorElementId, errorMessage) {
        const errorElement = document.getElementById(errorElementId);
        if (!regex.test(value)) {
            errorElement.textContent = errorMessage;
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    // Refactorisation de la validation des champs
    function validateFieldWithEmptyCheck(value, regex, errorElementId, errorMessage, emptyMessage) {
        const errorElement = document.getElementById(errorElementId);
        if (!value) {
            errorElement.textContent = emptyMessage;
            return false;
        }
        if (!regex.test(value)) {
            errorElement.textContent = errorMessage;
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    // Fonction pour faire défiler jusqu'à la zone de message
    function scrollToMessage() {
        const messageElement = document.getElementById("form-message");
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    // Fonction pour nettoyer les entrées utilisateur (échappe plus de caractères spéciaux)
    function sanitizeInput(input) {
        return input.replace(/[&<>"']/g, function(m) {
            return ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            })[m];
        });
    }

    // Ajout d'un gestionnaire d'événement pour la correction et validation en direct
    ["name", "email", "phone", "message"].forEach(id => {
        const input = document.getElementById(id);
        const errorElement = document.getElementById(`${id}-error`);
        const regex = regexPatterns[id];
        const emptyMessage = emptyFieldMessages[id];
        const errorMessage = errorMessages[id];

        input.addEventListener("input", () => {
            const value = input.value.trim();
            const hasForbiddenChars = /[<>]/.test(value);

            if (!value) {
                errorElement.textContent = emptyMessage;
                input.classList.add("is-invalid");
            } else if (hasForbiddenChars) {
                errorElement.textContent = errorMessages.specialChars;
                input.classList.add("is-invalid");
            } else if (!regex.test(value)) {
                errorElement.textContent = errorMessage;
                input.classList.add("is-invalid");
            } else if (id === "phone" && (value.replace(/[^0-9]/g, "").length < 10 || value.replace(/[^0-9]/g, "").length > 15)) {
                errorElement.textContent = "Le numéro doit contenir entre 10 et 15 chiffres.";
                input.classList.add("is-invalid");
            } else {
                errorElement.textContent = "";
                input.classList.remove("is-invalid");
            }
        });
    });

    // Ajout d'un gestionnaire d'événement pour la soumission du formulaire
    form.addEventListener("submit", function (event) {
        // Désactiver le bouton "Envoyer" pendant la validation
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;

        // Récupération et nettoyage des valeurs des champs du formulaire
        const name = sanitizeInput(document.getElementById("name").value.trim());
        const email = sanitizeInput(document.getElementById("email").value.trim());
        const phone = sanitizeInput(document.getElementById("phone").value.trim());
        const message = sanitizeInput(document.getElementById("message").value.trim());

        // Réinitialisation des messages d'erreur précédents
        document.querySelectorAll(".error").forEach(el => el.textContent = "");
        document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

        let isValid = true; // Utilisation d'un booléen pour suivre la validité globale

        // Validation des champs avec vérification des champs vides
        if (!validateFieldWithEmptyCheck(name, regexPatterns.name, "name-error", errorMessages.name, emptyFieldMessages.name)) {
            isValid = false;
        }
        if (!validateFieldWithEmptyCheck(email, regexPatterns.email, "email-error", errorMessages.email, emptyFieldMessages.email)) {
            isValid = false;
        }

        // Validation améliorée pour le champ téléphone
        const phoneErrorElement = document.getElementById("phone-error");
        const cleanedPhone = phone.replace(/[^0-9]/g, "");
        if (!phone) {
            phoneErrorElement.textContent = emptyFieldMessages.phone;
            document.getElementById("phone").classList.add("is-invalid");
            isValid = false;
        } else if (!regexPatterns.phone.test(phone)) {
            phoneErrorElement.textContent = errorMessages.phone;
            document.getElementById("phone").classList.add("is-invalid");
            isValid = false;
        } else if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
            phoneErrorElement.textContent = "Le numéro doit contenir entre 10 et 15 chiffres.";
            document.getElementById("phone").classList.add("is-invalid");
            isValid = false;
        } else {
            phoneErrorElement.textContent = "";
        }

        if (!validateFieldWithEmptyCheck(message, regexPatterns.message, "message-error", errorMessages.message, emptyFieldMessages.message)) {
            isValid = false;
        }

        // Vérification des caractères spéciaux interdits pour chaque champ
        const forbiddenChars = /[<>]/;
        ["name", "email", "phone", "message"].forEach(id => {
            const input = document.getElementById(id);
            const errorElement = document.getElementById(`${id}-error`);
            if (forbiddenChars.test(input.value)) {
                errorElement.textContent = errorMessages.specialChars;
                input.classList.add("is-invalid");
                isValid = false;
            }
        });

        // Gestion des messages globaux via #form-message
        const formMessageElement = document.getElementById("form-message");
        if (!isValid) {
            event.preventDefault();
            formMessageElement.textContent = "Veuillez corriger les erreurs dans le formulaire.";
            formMessageElement.classList.remove("d-none", "alert-success");
            formMessageElement.classList.add("alert", "alert-danger");
            scrollToMessage(); // Défilement vers #form-message
            setTimeout(() => submitButton.disabled = false, 1500);
        } else {
            formMessageElement.textContent = "Votre message a été envoyé avec succès.";
            formMessageElement.classList.remove("d-none", "alert-danger");
            formMessageElement.classList.add("alert", "alert-success");
            // submitButton.disabled = false; // facultatif, inutile si redirection
        }
    });
});
