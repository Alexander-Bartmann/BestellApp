function getMenuTemplate(menu, formattedPrice, i) {
    return `
        <div class="menu">
            <div class="menu_headline">
                <h2>${menu.name}</h2>
                <img src="img/plus.png" alt="" onclick="moveToBasket(${i})">
            </div>
            <span>${menu.description}</span>
            <span class="price padding"><strong>${formattedPrice}</strong></span>
        </div>`;
}

function getBasketTemplate(i, item) {
    return `
        <div>
            <div>
                <p><strong>${item.name}</strong></p>
                <p>Ausgewählte Option: ${item.selectedOption || 'Keine'}</p>
            </div>
            <div class="d_flex a_center">
                <button onclick="updateQuantity(${i}, -1)" class="cursor quantity">-</button>
                <p style="padding: 0 8px">${item.count}x</p>
                <button onclick="updateQuantity(${i}, 1)" class="cursor quantity">+</button>
                <p style="padding:0 0 0 8px">${item.formattedPrice} €</p>
                <img class="cursor" src="img/mulleimer.png" alt="" onclick="removeFromBasket(${i})">
            </div>
        </div>`;
}

function getBasketSummaryTemplate(total, deliveryText, grandTotal) {
    return `
        <div class="basket_summary">
            <div class="plz">
                <div>
                    <label for="postalCode">Geben Sie Ihre Postleitzahl ein:</label>
                    <input type="text" id="postalCode" placeholder="PLZ eingeben" onchange="updateDeliveryPrice()">
                </div>
            </div>
            <p><strong>Zwischensumme:</strong> ${total.toFixed(2).replace(".", ",")} €</p>
            <p><strong>Lieferkosten:</strong> ${deliveryText}</p>
            <p><strong>Gesamtsumme:</strong> ${grandTotal.toFixed(2).replace(".", ",")} €</p>
            <button id="orderButton" onclick="placeOrder()">Bestellen</button>
        </div>`;
}


