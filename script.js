const bakeryItems = [
    { name: "Signature Loaf", type: "Bread" },
    { name: "Croissant", type: "Pastry" },
    { name: "Seasonal Danish", type: "Pastry" },
    { name: "Birthday Cake", type: "Cake" }
];

function showFavoriteMessage(itemName) {
    const message = document.getElementById("favorite-message");

    if (!message) {
        return;
    }

    const item = bakeryItems.find(product => product.name === itemName);

    if (item) {
        message.textContent =
            `${item.name} is saved as your favorite ${item.type.toLowerCase()}.`;
    }
}

function saveFavorite() {
    const favoriteSelect = document.getElementById("favorite-item");

    if (!favoriteSelect || !favoriteSelect.value) {
        return;
    }

    localStorage.setItem("bakeryFavorite", favoriteSelect.value);
    showFavoriteMessage(favoriteSelect.value);
}

function loadFavorite() {
    const favoriteSelect = document.getElementById("favorite-item");

    if (!favoriteSelect) {
        return;
    }

    const savedFavorite = localStorage.getItem("bakeryFavorite");

    if (savedFavorite) {
        favoriteSelect.value = savedFavorite;
        showFavoriteMessage(savedFavorite);
    }
}

function setupFavoriteFeature() {
    const saveButton = document.getElementById("save-favorite");

    if (!saveButton) {
        return;
    }

    loadFavorite();
    saveButton.addEventListener("click", saveFavorite);
}

setupFavoriteFeature();
const requiredFields = ["name", "email", "item-details"];

function showError(fieldId, message) {
    const error = document.getElementById(`${fieldId}-error`);

    if (error) {
        error.textContent = message;
    }
}

function clearErrors() {
    requiredFields.forEach(function(fieldId) {
        showError(fieldId, "");
    });

    showError("pickup-date", "");
    showError("request-type", "");
}

function validateForm() {
    clearErrors();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const pickupDate = document.getElementById("pickup-date");
    const requestType = document.getElementById("request-type");
    const itemDetails = document.getElementById("item-details");

    let valid = true;

    if (name.value.trim().length < 2) {
        showError(
            "name",
            "Please enter at least 2 characters for your name."
        );
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        showError(
            "email",
            "Please enter a valid email address."
        );
        valid = false;
    }

    if (!pickupDate.value) {
        showError(
            "pickup-date",
            "Please choose a pickup date."
        );
        valid = false;
    }

    if (!requestType.value) {
        showError(
            "request-type",
            "Please choose a request type."
        );
        valid = false;
    }

    if (itemDetails.value.trim().length < 5) {
        showError(
            "item-details",
            "Please give at least 5 characters of item details."
        );
        valid = false;
    }

    return valid;
}

function setupForm() {
    const form = document.getElementById("bakery-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (validateForm()) {
            const status = document.getElementById("form-status");

            status.textContent =
                "Your request looks good and is ready to send.";
        }
    });
}

setupForm();