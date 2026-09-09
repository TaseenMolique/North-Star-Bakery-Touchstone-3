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