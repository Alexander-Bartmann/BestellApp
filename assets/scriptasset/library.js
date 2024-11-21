let menus = [
    {
      "name": "Döner",
      "description": "mit Dönerfleisch, grünem Salat, Tomaten, Zwiebeln, Weißkraut, Blaukraut und Sauce nach Wahl im Fladenbrot",
      "price": 7.00,
      "categories": ["beliebt", "tagesangebot"],
      "options": {
        "sauce": ["Joghurt", "Knoblauch", "Scharf", "Ohne Sauce"]
      }
    },
    {
      "name": "Pizza Salami",
      "description": "Groß, Ø 32cm",
      "price": 10.00,
      "categories": ["beliebt"]
    },
    {
      "name": "Gebratene Nudeln mit Hähnchenfleisch",
      "description": "",
      "price": 12.00,
      "categories": ["beliebt"]
    },
    {
      "name": "Spar-Angebot Party Pizza",
      "description": "mit einem großen gemischten Salat und einem alkoholfreien Getränk 1,0l Liter nach Wahl",
      "price": 36.50,
      "categories": ["sparen"],
      "options": {
        "getränk": ["Coca-Cola", "Sprite", "Fanta", "Wasser", "Eistee"]
      }
    },
    {
      "name": "Spar-Angebot Familienpizza",
      "description": "mit einem großen gemischten Salat und einem alkoholfreien Getränk 1,0l Liter nach Wahl",
      "price": 31.50,
      "categories": ["sparen"],
      "options": {
        "getränk": ["Coca-Cola", "Sprite", "Fanta", "Wasser", "Eistee"]
      }
    },
    {
      "name": "Tagesangebot - Pizza",
      "description": "Wahl aus: Pizza Margherita, Pizza Salami, Pizza Prosciutto, Pizza Funghi, Pizza Sardellen und mehr.",
      "price": 17.50,
      "categories": ["tagesangebot"],
      "options": {
        "pizza-variation": [
          "Margherita",
          "Salami",
          "Prosciutto",
          "Funghi",
          "Sardellen"
        ]
      }
    },
    {
      "name": "Tagesangebot - Döner Menü",
      "description": "1 Döner, pommes frites, alkoholfreies Getränk 0,33l nach Wahl",
      "price": 12.00,
      "categories": ["tagesangebot"],
      "options": {
        "getränk": ["Coca-Cola", "Sprite", "Fanta", "Wasser", "Eistee"]
      }
    },
    {
      "name": "Grüner Salat",
      "description": "mit Zwiebeln",
      "price": 5.50,
      "categories": ["salat"]
    },
    {
      "name": "Tomatensalat",
      "description": "mit Zwiebeln",
      "price": 6.00,
      "categories": ["salat"]
    },
    {
      "name": "Gurkensalat",
      "description": "Wahl aus: mit Balsamico-Dressing, mit Essig-Öl-Dressing, mit Joghurt-Dressing oder ohne Dressing.",
      "price": 6.00,
      "categories": ["salat"],
      "options": {
        "dressing": ["Balsamico", "Essig-Öl", "Joghurt", "Ohne Dressing"]
      }
    },
    {
      "name": "Mozzarella-Salat",
      "description": "mit Tomaten und Zwiebeln",
      "price": 7.50,
      "categories": ["salat"]
    },
    {
      "name": "Gemischter Salat",
      "description": "mit grünem Salat, Tomaten, Gurken, Mais, Zwiebeln, Paprika",
      "price": 7.50,
      "categories": ["salat"]
    },
    {
      "name": "Hawaii-Toast",
      "description": "mit Ananas",
      "price": 6.50,
      "categories": ["toast"]
    },
    {
      "name": "American-Toast",
      "description": "mit Salami",
      "price": 6.50,
      "categories": ["toast"]
    },
    {
      "name": "TOP-Toast",
      "description": "mit Salami, Zwiebeln, Salat und Mayonnaise",
      "price": 6.50,
      "categories": ["toast"]
    },
    {
      "name": "Pizza-Brot",
      "description": "",
      "price": 5.50,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Margherita",
      "description": "",
      "price": 7.00,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Salami",
      "description": "",
      "price": 7.50,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Prosciutto",
      "description": "",
      "price": 7.50,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Funghi",
      "description": "mit frischen Champignons",
      "price": 7.50,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Sardellen",
      "description": "",
      "price": 7.50,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Capri",
      "description": "mit Salami und Schinken",
      "price": 8.00,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Regina",
      "description": "mit Schinken und Champignons",
      "price": 8.00,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Milano",
      "description": "mit Salami und Champignons",
      "price": 8.00,
      "categories": ["pizza"]
    },
    {
      "name": "Pizza Hawaii",
      "description": "mit Schinken und Ananas",
      "price": 8.50,
      "categories": ["pizzaUsa"]
    },
    {
      "name": "Pizza New York",
      "description": "mit Salami, Schinken, Champignons, Peperoni und Zwiebeln",
      "price": 13.50,
      "categories": ["pizzaUsa"]
    },
    {
      "name": "Pizza Chicago",
      "description": "mit Broccoli, Paprika, Tomaten, Erbsen und Spinat",
      "price": 13.50,
      "categories": ["pizzaUsa"]
    },
    {
      "name": "Pizza Texana (sehr scharf)",
      "description": "mit Salami, Mais, Peperoni und Paprika",
      "price": 13.50,
      "categories": ["pizzaUsa"]
    },
    {
      "name": "Pasta Napoli",
      "description": "mit würziger Tomatensauce",
      "price": 7.00,
      "categories": ["pasta"]
    },
    {
      "name": "Pasta Bolognese",
      "description": "mit Rinder-Hackfleischsauce",
      "price": 9.00,
      "categories": ["pasta"]
    },
    {
      "name": "Pasta alla Panna",
      "description": "mit Schinken und Sahnesauce",
      "price": 9.00,
      "categories": ["pasta"]
    },
    {
      "name": "Pasta Spinaci",
      "description": "mit Spinat, Champignons und Sahne",
      "price": 10.00,
      "categories": ["pasta"]
    },
    {
      "name": "Pasta Carbonara",
      "description": "mit Schinken, Eigelb und Sahne",
      "price": 10.00,
      "categories": ["pasta"]
    },
    {
      "name": "Pasta Arrabiata (scharf)",
      "description": "mit Tomaten, Knoblauch, Basilikum und Peperoni",
      "price": 10.00,
      "categories": ["pasta"]
    },
    {
      "name": "Chicken Wings",
      "description": "scharf gewürzt",
      "price": 9.00,
      "categories": ["fleischgericht"]
    },
    {
      "name": "Döner-Teller",
      "description": "Dönerfleisch mit Pommes und Salat",
      "price": 13.50,
      "categories": ["fleischgericht"]
    },
    {
      "name": "Coca-Cola",
      "description": "1,0l Flasche",
      "price": 3.50,
      "categories": ["getränke"]
    },
    {
      "name": "Sprite",
      "description": "1,0l Flasche",
      "price": 3.50,
      "categories": ["getränke"]
    },
    {
      "name": "Fanta",
      "description": "1,0l Flasche",
      "price": 3.50,
      "categories": ["getränke"]
    },
    {
      "name": "Wasser",
      "description": "1,0l stilles Mineralwasser",
      "price": 2.50,
      "categories": ["getränke"]
    },
    {
      "name": "Eistee Pfirsich",
      "description": "1,0l Flasche",
      "price": 3.00,
      "categories": ["getränke"]
    },
    {
      "name": "Bier (Pils)",
      "description": "1,0l Flasche",
      "price": 4.00,
      "categories": ["getränke"]
    }
  ];
  