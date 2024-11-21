/* 
  Funktion init() - Startet die Anwendung
  Diese Funktion wird zu Beginn aufgerufen, um das Menü und den Warenkorb zu rendern.
*/
function init() {
    renderMenu();  // Rendert das Menü, indem alle verfügbaren Menüpunkte angezeigt werden.
    renderBasket();  // Rendert den Warenkorb, falls bereits Artikel hinzugefügt wurden.
}

/* 
  Funktion renderMenu() - Rendert das Menü
  Diese Funktion geht durch alle Menüelemente und zeigt sie je nach Kategorie an.
*/
function renderMenu() {
    let contentMenu = document.getElementById('menuContent');  // Holt sich das Element, in dem das Menü angezeigt wird.
    contentMenu.innerHTML = "";  // Leert das HTML-Inhalt, falls vorher schon etwas angezeigt wurde.
    for (let i = 0; i < menus.length; i++) {  // Durchläuft alle Menüpunkte im 'menus' Array.
        let menu = menus[i];  // Holt sich das Menüelement aus dem Array.
        let formattedPrice = `${menu.price.toFixed(2).replace(".", ",")} €`;  // Formatierung des Preises mit 2 Dezimalstellen.
        if (currentCategory === 'Alle' || menu.categories.includes(currentCategory)) {  // Prüft, ob das Menü zur aktuellen Kategorie passt.
            contentMenu.innerHTML += getMenuTemplate(menu, formattedPrice, i);  // Fügt das HTML des Menüelements zum Content hinzu.
        }
    }
}

/* 
  Funktion getMenuTemplate(menu, formattedPrice, i) - Erstellt das HTML für ein Menüelement
  Diese Funktion wird aufgerufen, um das HTML für jedes Menü mit Name, Beschreibung und Preis zu erstellen.
*/
function getMenuTemplate(menu, formattedPrice, i) {
    return `
        <div class="menu">
            <div class="menu_headline">
                <h2>${menu.name}</h2>  // Zeigt den Namen des Menüs an.
                <img src="img/plus.png" alt="" onclick="moveToBasket(${i})">  // Fügt ein "Plus"-Symbol hinzu, um das Menü zum Warenkorb zu legen.
            </div>
            <span>${menu.description}</span>  // Zeigt die Beschreibung des Menüs an.
            <span class="price padding"><strong>${formattedPrice}</strong></span>  // Zeigt den Preis des Menüs an.
        </div>`;
}

/* 
  Funktion renderBasket() - Rendert den Warenkorb
  Diese Funktion zeigt entweder den Warenkorb mit den hinzugefügten Artikeln oder eine Nachricht, dass der Warenkorb leer ist.
*/
function renderBasket() {
    let contentBasket = document.getElementById('basketContent');  // Holt sich das Element, in dem der Warenkorb angezeigt wird.
    contentBasket.innerHTML = `<h2>Warenkorb</h2>`;  // Fügt einen Titel für den Warenkorb hinzu.
    let total = 0;  // Initialisiert die Variable für die Zwischensumme.
    if (basket.length === 0) {  // Wenn der Warenkorb leer ist.
        contentBasket.innerHTML += `<p>Ihr Warenkorb ist leer</p>`;  // Zeigt eine Nachricht an, dass der Warenkorb leer ist.
        renderSummary(0);  // Rendert die Zusammenfassung mit einer Zwischensumme von 0.
    } else {  // Wenn der Warenkorb nicht leer ist.
        total = renderBasketItems(contentBasket);  // Ruft die Funktion auf, um alle Warenkorb-Items zu rendern und berechnet die Gesamtsumme.
        renderSummary(total);  // Rendert die Zusammenfassung mit der berechneten Gesamtsumme.
    }
    updateBasketButton(total);  // Aktualisiert den Warenkorb-Button mit der aktuellen Gesamtsumme.
}

/* 
moveToBasket Funktion wird aufgerufen, wenn der Benutzer auf das "Plus"-Symbol klickt, um ein Menüitem zum Warenkorb hinzuzufügen. 
Wenn das Menü eine Auswahl an Optionen hat, wird die Funktion renderOptions aufgerufen, um die Auswahlmöglichkeiten anzuzeigen. 
Andernfalls wird das Menü direkt dem Warenkorb hinzugefügt.
*/
function moveToBasket(index) {
    let selectedMenu = menus[index];  // Das ausgewählte Menü wird anhand des Indexes aus dem 'menus' Array abgerufen.
    
    // Wenn das Menü Optionen hat, wird die Funktion renderOptions aufgerufen, um die Auswahlmöglichkeiten anzuzeigen.
    if (selectedMenu.options) {
        renderOptions(selectedMenu); 
        return; // Hier endet die Funktion, wenn Optionen angezeigt werden.
    }

    // Wenn es bereits einen Artikel im Warenkorb ohne ausgewählte Optionen gibt, wird die Anzahl dieses Artikels um 1 erhöht.
    let existingItem = basket.find(item => item.name === selectedMenu.name && item.selectedOption === '');
    if (existingItem) {
        existingItem.count += 1;  // Erhöhe die Anzahl des Artikels.
    } else {
        generateMoveToBasket(selectedMenu); // Andernfalls wird ein neuer Artikel in den Warenkorb gelegt.
    }

    // Der Warenkorb wird nach jeder Änderung neu gerendert.
    renderBasket(); 
}

/* 
  Funktion renderBasketItems(contentBasket) - Rendert alle Artikel im Warenkorb
  Diese Funktion zeigt alle Artikel im Warenkorb an und berechnet die Gesamtsumme.
*/
function renderBasketItems(contentBasket) {
    let total = 0;  // Initialisiert die Variable für die Gesamtsumme.
    for (let i = 0; i < basket.length; i++) {  // Durchläuft jedes Element im Warenkorb.
        let item = basket[i];  // Holt sich das Item aus dem Warenkorb.
        if (item.price !== undefined) {  // Stellt sicher, dass der Preis definiert ist.
            item.formattedPrice = (item.price * item.count).toFixed(2).replace(".", ",");  // Berechnet den Gesamtpreis des Artikels.
            total += item.price * item.count;  // Addiert den Preis des Artikels zur Gesamtsumme.
            contentBasket.innerHTML += getBasketTemplate(i, item);  // Ruft die Funktion auf, um das HTML für das Warenkorb-Item zu generieren.
        }
    }
    return total;  // Gibt die Gesamtsumme zurück.
}

/* 
  Funktion getBasketTemplate(i, item) - Erstellt das HTML für ein Artikel im Warenkorb
  Diese Funktion wird aufgerufen, um das HTML für jedes Item im Warenkorb zu generieren (mit Möglichkeit zur Menge ändern und löschen).
*/
function getBasketTemplate(i, item) {
    return `
        <div>
            <div>
                <p><strong>${item.name}</strong></p>  // Zeigt den Namen des Artikels an.
                <p>Ausgewählte Option: ${item.selectedOption || 'Keine'}</p>  // Zeigt die gewählte Option des Artikels an, falls vorhanden.
            </div>
            <div class="d_flex a_center">
                <button onclick="updateQuantity(${i}, -1)" class="cursor quantity">-</button>  // Button zum Reduzieren der Menge.
                <p style="padding: 0 8px">${item.count}x</p>  // Zeigt die Menge des Artikels an.
                <button onclick="updateQuantity(${i}, 1)" class="cursor quantity">+</button>  // Button zum Erhöhen der Menge.
                <p style="padding:0 0 0 8px">${item.formattedPrice} €</p>  // Zeigt den Preis des Artikels an.
                <img class="cursor" src="img/mulleimer.png" alt="" onclick="removeFromBasket(${i})">  // Löscht den Artikel aus dem Warenkorb.
            </div>
        </div>`;
}

/* 
  Funktion renderSummary(total) - Rendert die Zusammenfassung des Warenkorbs
  Diese Funktion zeigt die Zwischensumme, Lieferkosten und die Gesamtsumme an.
*/
function renderSummary(total) {
    let contentSummary = document.getElementById('summaryContent');  // Holt sich das Element, in dem die Zusammenfassung angezeigt wird.
    let deliveryText = deliveryPrice !== null 
    ? `${deliveryPrice.toFixed(2).replace(".", ",")} €` 
    : "Wir liefern nur in München und Umgebung.";  // Berechnet die Lieferkosten basierend auf dem Wert von 'deliveryPrice'.
    let grandTotal = total + (deliveryPrice || 0);  // Berechnet die Gesamtsumme (Zwischensumme + Lieferkosten).
    contentSummary.innerHTML = getBasketSummaryTemplate(total, deliveryText, grandTotal);  // Ruft die Funktion auf, um das HTML für die Zusammenfassung zu generieren.
}

/* 
  Funktion getBasketSummaryTemplate(total, deliveryText, grandTotal) - Erstellt das HTML für die Zusammenfassung des Warenkorbs
  Diese Funktion zeigt die Zwischensumme, Lieferkosten und die Gesamtsumme des Warenkorbs an.
*/
function getBasketSummaryTemplate(total, deliveryText, grandTotal) {
    return `
        <div class="basket_summary">
            <div class="plz">
                <div>
                    <label for="postalCode">Geben Sie Ihre Postleitzahl ein:</label>
                    <input type="text" id="postalCode" placeholder="PLZ eingeben" onchange="updateDeliveryPrice()">  // Eingabefeld für die Postleitzahl zur Berechnung der Lieferkosten.
                </div>
            </div>
            <p><strong>Zwischensumme:</strong> ${total.toFixed(2).replace(".", ",")} €</p>  // Zeigt die Zwischensumme an.
            <p><strong>Lieferkosten:</strong> ${deliveryText}</p>  // Zeigt die Lieferkosten an.
            <p><strong>Gesamtsumme:</strong> ${grandTotal.toFixed(2).replace(".", ",")} €</p>  // Zeigt die Gesamtsumme an.
            <button id="orderButton" onclick="placeOrder()">Bestellen</button>  // Button zum Bestellen.
        </div>`;
}

/* 
  Funktion updateDeliveryPrice() - Aktualisiert die Lieferkosten basierend auf der Postleitzahl
  Diese Funktion prüft die Postleitzahl des Benutzers und berechnet die Lieferkosten.
*/
function updateDeliveryPrice() {
    let postalCodeInput = document.getElementById('postalCode');  // Holt sich das Postleitzahl-Eingabefeld.
    let postalCode = postalCodeInput.value;  // Holt sich den Wert der Postleitzahl.
    if (postalCode.startsWith("80") || postalCode.startsWith("81")) {
        deliveryPrice = 5;  // Setzt die Lieferkosten auf 5 € für bestimmte Postleitzahlen.
    } else if (["820", "821", "856", "855", "857", "852", "822", "823"].some(code => postalCode.startsWith(code))) {
        deliveryPrice = 10;  // Setzt die Lieferkosten auf 10 € für andere Postleitzahlen.
    } else {
        deliveryPrice = null;  // Setzt die Lieferkosten auf null, wenn keine gültige Postleitzahl angegeben wurde.
    }
    postalCodeInput.value = "";  // Leert das Postleitzahl-Eingabefeld.
    renderBasket();  // Rendert den Warenkorb erneut, um die neuen Lieferkosten anzuzeigen.
}

/* 
  Funktion updateQuantity(index, change) - Aktualisiert die Menge eines Artikels im Warenkorb
  Diese Funktion wird verwendet, um die Menge eines Artikels im Warenkorb zu erhöhen oder zu verringern.
*/
function updateQuantity(index, change) {
    if (basket[index].count + change > 0) {  // Überprüft, ob die neue Menge gültig ist.
        basket[index].count += change;  // Erhöht oder verringert die Menge.
    } else {
        removeFromBasket(index);  // Entfernt den Artikel, wenn die Menge auf 0 oder weniger sinkt.
    }
    renderBasket();  // Rendert den Warenkorb erneut.
}

/* 
  Funktion findItemByOption(menuName, option) - Sucht nach einem Artikel im Warenkorb mit einer bestimmten Option
  Diese Funktion wird verwendet, um zu prüfen, ob ein Artikel mit einer bestimmten Option bereits im Warenkorb ist.
*/
function findItemByOption(menuName, option) {
    for (let i = 0; i < basket.length; i++) {  // Durchläuft alle Artikel im Warenkorb.
        if (basket[i].name === menuName && (basket[i].selectedOption === option || basket[i].selectedOption === '')) {
            return basket[i];  // Gibt das gefundene Item zurück.
        }
    }
    return null;  // Gibt null zurück, wenn kein Artikel gefunden wurde.
}

/* 
  Funktion createNewItem(menuName, option) - Erstellt ein neues Item für den Warenkorb
  Diese Funktion wird verwendet, um ein neues Item zu erstellen, wenn der Benutzer eine Option auswählt.
*/
function createNewItem(menuName, option) {
    let selectedMenu = menus.find(menu => menu.name === menuName);  // Sucht das Menü-Element anhand des Namens.
    return {
        name: menuName,
        description: '',
        price: selectedMenu ? selectedMenu.price : 0,
        count: 1,
        selectedOption: option,
        formattedPrice: selectedMenu ? selectedMenu.price.toFixed(2).replace(".", ",") : '0,00'
    };
}

/* 
  Funktion selectOption(menuName, option) - Wählt eine Option für ein Menü aus
  Diese Funktion fügt das Menü mit der gewählten Option zum Warenkorb hinzu oder aktualisiert es, wenn es bereits existiert.
*/
function selectOption(menuName, option) {
    let item = findItemByOption(menuName, option);  // Sucht nach dem Artikel im Warenkorb.
    if (item) {
        if (item.selectedOption === option) {  // Wenn die Option bereits ausgewählt wurde.
            item.count += 1;  // Erhöht die Menge des Artikels.
        } else {
            item.selectedOption = option;  // Ändert die ausgewählte Option.
            item.count = 1;  // Setzt die Menge auf 1.
        }
    } else {
        basket.push(createNewItem(menuName, option));  // Fügt das neue Item mit der Option zum Warenkorb hinzu.
    }
    renderBasket();  // Rendert den Warenkorb erneut.
    document.getElementById('optionsContainer').style.display = 'none';  // Versteckt die Optionsauswahl.
}

/* 
  Funktion filterMenu(category) - Filtert das Menü nach Kategorie
  Diese Funktion wird verwendet, um das Menü nach einer bestimmten Kategorie zu filtern.
*/
function filterMenu(category) {
    currentCategory = category;  // Setzt die aktuelle Kategorie auf die gewählte Kategorie.
    renderMenu();  // Rendert das Menü erneut mit der gefilterten Kategorie.
}

/* 
  Funktion placeOrder() - Bestellt die Artikel im Warenkorb
  Diese Funktion wird aufgerufen, wenn der Benutzer den Bestellbutton klickt.
*/
function placeOrder() {
    document.getElementById('orderButton').style.display = 'none';  // Versteckt den Bestellbutton.
    clearBasket();  // Leert den Warenkorb.
    showOrderConfirmation();  // Zeigt die Bestellbestätigung an.
}

/* 
  Funktion clearBasket() - Leert den Warenkorb
  Diese Funktion leert den Warenkorb und rendert ihn anschließend neu.
*/
function clearBasket() {
    basket = [];  // Setzt den Warenkorb auf ein leeres Array.
    renderBasket();  // Rendert den leeren Warenkorb.
    renderSummary(0);  // Rendert die Zusammenfassung mit einer Zwischensumme von 0.
}

/* 
  Funktion showOrderConfirmation() - Zeigt die Bestellbestätigung
  Diese Funktion zeigt eine Bestätigung der Bestellung an, wenn der Bestellvorgang abgeschlossen ist.
*/
function showOrderConfirmation() {
    let orderConfirmation = document.getElementById('orderConfirmation');  // Holt sich das Bestätigungs-Element.
    orderConfirmation.classList.remove('hidden');  // Entfernt die Klasse 'hidden', um die Bestätigung anzuzeigen.
    orderConfirmation.style.display = 'flex';  // Setzt das Anzeigeverhalten auf flex.
}

/* 
  Funktion closeOrderConfirmation(i) - Schließt die Bestellbestätigung
  Diese Funktion schließt die Bestellbestätigung, wenn auf den Hintergrund geklickt wird.
*/
function closeOrderConfirmation(i) {
    if (i.target === document.getElementById('orderConfirmation')) {  // Wenn der Klick auf den Hintergrund war.
        let orderConfirmation = document.getElementById('orderConfirmation');  // Holt sich die Bestellbestätigung.
        orderConfirmation.classList.add('hidden');  // Versteckt die Bestellbestätigung.
        orderConfirmation.style.display = 'none';  // Setzt das Anzeigeverhalten auf 'none'.
    }
}

/* 
  Funktion toggleBasket() - Zeigt oder versteckt den Warenkorb
  Diese Funktion wird verwendet, um den Warenkorb anzuzeigen oder zu verbergen.
*/
function toggleBasket() {
    let basket = document.getElementById('basket');  // Holt sich das Warenkorb-Element.
    if (basket.classList.contains('hidden')) {  // Wenn der Warenkorb versteckt ist.
        showBasket();  // Zeigt den Warenkorb an.
    } else {
        hideBasket();  // Versteckt den Warenkorb.
    }
}

/* 
  Funktion showBasket() - Zeigt den Warenkorb im Vollbildmodus
  Diese Funktion zeigt den Warenkorb im Vollbildmodus an und verhindert das Scrollen.
*/
function showBasket() {
    let basket = document.getElementById('basket');  // Holt sich das Warenkorb-Element.
    let basketContent = document.getElementById('basketContent');  // Holt sich den Warenkorb-Inhalt.
    let summaryContent = document.getElementById('summaryContent');  // Holt sich die Zusammenfassung.
    basket.classList.remove('hidden');  // Entfernt die 'hidden' Klasse, um den Warenkorb anzuzeigen.
    basket.classList.add('fullscreen');  // Fügt die 'fullscreen' Klasse hinzu, um den Vollbildmodus zu aktivieren.
    basketContent.classList.remove('hidden');  // Zeigt den Inhalt des Warenkorbs an.
    basketContent.classList.add('fullscreen');  // Setzt den Inhalt auf den Vollbildmodus.
    summaryContent.classList.remove('hidden');  // Zeigt die Zusammenfassung an.
    summaryContent.classList.add('fullscreen');  // Setzt die Zusammenfassung auf den Vollbildmodus.
    document.body.style.overflow = 'hidden';  // Verhindert das Scrollen der Seite.
}

/* 
  Funktion hideBasket() - Versteckt den Warenkorb
  Diese Funktion wird verwendet, um den Warenkorb wieder zu verstecken.
*/
function hideBasket() {
    let basket = document.getElementById('basket');  // Holt sich das Warenkorb-Element.
    let basketContent = document.getElementById('basketContent');  // Holt sich den Warenkorb-Inhalt.
    let summaryContent = document.getElementById('summaryContent');  // Holt sich die Zusammenfassung.
    basket.classList.add('hidden');  // Fügt die 'hidden' Klasse hinzu, um den Warenkorb zu verstecken.
    basket.classList.remove('fullscreen');  // Entfernt den 'fullscreen' Modus.
    basketContent.classList.add('hidden');  // Versteckt den Inhalt des Warenkorbs.
    basketContent.classList.remove('fullscreen');  // Entfernt den 'fullscreen' Modus.
    summaryContent.classList.add('hidden');  // Versteckt die Zusammenfassung.
    summaryContent.classList.remove('fullscreen');  // Entfernt den 'fullscreen' Modus.
    document.body.style.overflow = 'auto';  // Ermöglicht das Scrollen der Seite.
}

/* 
  Funktion updateBasketButton(total) - Aktualisiert den Text des Warenkorb-Buttons
  Diese Funktion wird verwendet, um den Text des Buttons für den Warenkorb zu aktualisieren, 
  abhängig von der Gesamtsumme des Warenkorbs.
*/
function updateBasketButton(total) {
    let button = document.getElementById('basketButton');  // Holt sich den Warenkorb-Button.
    if (total === 0) {
        button.innerHTML = "Warenkorb (leer)";  // Zeigt "leer" an, wenn der Warenkorb leer ist.
    } else {
        button.innerHTML = `Warenkorb (${total.toFixed(2).replace(".", ",")} €)`;  // Zeigt den Gesamtpreis des Warenkorbs an.
    }
}
