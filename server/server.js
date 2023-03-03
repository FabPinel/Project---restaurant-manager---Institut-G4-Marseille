const express = require('express')
const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mysqli = require('mysql')

const dataBase = mysqli.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'restaurant_manager',
})

dataBase.connect(function (err) { if (err) throw err; console.log("Connecté à la base de données MySQL!"); });

app.use(express.json())

app.get("/categories", (req, res) => { // pour chaque nouvelle requete il faut changer le "/" 
  const q = "SELECT * FROM categories"
  dataBase.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

// REQUETES PAGE SALLE--------------------------------------------------------------------------------
//AFFICHAGE TABLES SALLE1
app.get("/tables-salle1", (req, res) => {
  const t = "SELECT * FROM `tables` WHERE salle = 'Salle1'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHAGE TABLES SALLE2
app.get("/tables-salle2", (req, res) => {
  const t = "SELECT * FROM `tables` WHERE salle = 'Salle2'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})
//-------------------------------------------------------------------------------------------------

// REQUETES PAGE RÉSERVATION - CRÉATION RÉSERVATION-----------------------------------------------------------------------------
app.get("/reservations", (req, res) => {
  const nbr = "SELECT * FROM `reservation`"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/reservation-add", (req, res) => {
  const q = "INSERT INTO `reservation` (`nbPersonnes`, `tableReserve`, `dateReserve`, `clientReserve`) VALUES (?)"
  const values = [
    req.body.nbPersonnes,
    req.body.tableReserve,
    req.body.dateReserve,
    req.body.clientReserve,

  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Réservation ajoutée avec succès.")
  })
})
// REQUETES PAGE RÉSERVATION - CRÉATION CLIENT-----------------------------------------------------------------------------

app.get("/clients", (req, res) => {
  const nbr = "SELECT * FROM `clients`"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/clients-add", (req, res) => {
  const q = "INSERT INTO `clients` (`nomClient`, `prenomClient`, `telephoneClient`) VALUES (?)"
  const values = [
    req.body.nomClient,
    req.body.prenomClient,
    req.body.telephoneClient,
  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Client ajouté avec succès.")
  })
})

//-----------------------------------------------//



//AFFICHAGE TABLES TERASSE
app.get("/tables-terrasse", (req, res) => {
  const t = "SELECT * FROM `tables` WHERE salle = 'Terrasse'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER LES PIZZAS BASE TOMATE
app.get("/pizza-tomate", (req, res) => {
  const t = "SELECT * FROM `plats` WHERE categorie = 'Pizzas - Tomate'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER LES PIZZAS BASE CREME
app.get("/pizza-creme", (req, res) => {
  const t = "SELECT * FROM `plats` WHERE categorie = 'Pizzas - Crème'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER LES PATES
app.get("/pates", (req, res) => {
  const t = "SELECT * FROM `plats` WHERE categorie = 'Pâtes'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER LES SALADES
app.get("/salades", (req, res) => {
  const t = "SELECT * FROM `plats` WHERE categorie = 'Salade'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})


//AFFICHER LES DESSERTS GOURMANT
app.get("/desserts-gourmant", (req, res) => {
  const t = "SELECT * FROM `plats` WHERE categorie = 'DessertGourmant'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER LES DESSERTS GLACE
app.get("/desserts-glace", (req, res) => {
  const t = "SELECT * FROM `plats` WHERE categorie = 'DessertGlace'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER LES BOISSONS
app.get("/boissons", (req, res) => {
  const t = "SELECT * FROM `plats` WHERE categorie = 'Boissons'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})


//TOTAL RESERVATION SALLE1
app.get("/nombres-reservations-salle1", (req, res) => {
  const nbr = "SELECT count(statutTable) FROM `tables`  WHERE salle = 'Salle1' AND statutTable = 'Réservée' HAVING count(statutTable) IS NOT NULL"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['count(statutTable)'])
  })
})

//TOTAL RESERVATION SALLE2
app.get("/nombres-reservations-salle2", (req, res) => {
  const nbr = "SELECT count(statutTable) FROM `tables`  WHERE salle = 'Salle2' AND statutTable = 'Réservée' HAVING count(statutTable) IS NOT NULL"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['count(statutTable)'])
  })
})

//TOTAL RESERVATION TERRASSE
app.get("/nombres-reservations-terrasse", (req, res) => {
  const nbr = "SELECT count(statutTable) FROM `tables`  WHERE salle = 'terrasse' AND statutTable = 'Réservée' HAVING count(statutTable) IS NOT NULL"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['count(statutTable)'])
  })
})

//TOTAL NBR COUVERT SALLE1
app.get("/nombres-couverts-salle1", (req, res) => {
  const nbr = "SELECT sum(placeTable) FROM `tables`  WHERE salle = 'Salle1'"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['sum(placeTable)'])
  })
})

//TOTAL NBR COUVERT SALLE2
app.get("/nombres-couverts-salle2", (req, res) => {
  const nbr = "SELECT sum(placeTable) FROM `tables`  WHERE salle = 'Salle2'"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['sum(placeTable)'])
  })
})

//TOTAL NBR COUVERT TERRASSE
app.get("/nombres-couverts-terrasse", (req, res) => {
  const nbr = "SELECT sum(placeTable) FROM `tables`  WHERE salle = 'Terrasse'"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['sum(placeTable)'])
  })
})

//TOTAL TABLE SALLE1
app.get("/nombres-tables-salle1", (req, res) => {
  const nbr = "SELECT count(numeroTable) FROM `tables`  WHERE salle = 'Salle1'"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['count(numeroTable)'])
  })
})

//TOTAL TABLE SALLE2
app.get("/nombres-tables-salle2", (req, res) => {
  const nbr = "SELECT count(numeroTable) FROM `tables`  WHERE salle = 'Salle2'"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['count(numeroTable)'])
  })
})

//TOTAL TABLE TERRASSE
app.get("/nombres-tables-terrasse", (req, res) => {
  const nbr = "SELECT count(numeroTable) FROM `tables`  WHERE salle = 'terrasse'"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]['count(numeroTable)'])
  })
})

//CREATE TABLE
app.post("/table-add", (req, res) => {
  const q = "INSERT INTO `tables` (`numeroTable`, `placeTable`, `salle`) VALUES (?)"
  const values = [
    req.body.numeroTable,
    req.body.placeTable,
    req.body.salle,
  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Table ajoutée avec succès.")
  })
})

//DELETE TABLE
app.delete("/table-delete/:id", (req, res) => {
  const tableId = req.params.id;
  const q = "DELETE FROM `tables` WHERE numeroTable = ?"

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Table suprimée avec succès.")
  })
})

//UPDATE TABLE
app.put("/tableUpdate/:id", (req, res) => {
  const tableId = req.params.id;
  const q = "UPDATE `tables` SET `placeTable`=?, `salle`=?, `statutTable`=? WHERE numeroTable=?";
  const values = [
    req.body.placeTable,
    req.body.salle,
    req.body.statutTable,
  ];

  dataBase.query(q, [...values, tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Table mise à jour avec succès.")
  })
})

//UPDATE STATUT TO OCCUPEE
app.put("/tableUpdate-occupee/:numeroTable", (req, res) => {
  const tableId = req.params.numeroTable;
  const q = "UPDATE `tables` SET `statutTable`='Occupée' WHERE numeroTable=?";

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Statut de la table mise à jour avec succès en occupée.")
  })
})

//UPDATE STATUT TO RESERVEE
app.put("/tableUpdate-reservee/:numeroTable", (req, res) => {
  const tableId = req.params.numeroTable;
  const q = "UPDATE `tables` SET `statutTable`='Réservée' WHERE numeroTable=?";

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Statut de la table mise à jour avec succès en résevée.")
  })
})

//UPDATE STATUT TO LIBRE
app.put("/tableUpdate-libre/:numeroTable", (req, res) => {
  const tableId = req.params.numeroTable;
  const q = "UPDATE `tables` SET `statutTable`='Libre' WHERE numeroTable=?";

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Statut de la table mise à jour avec succès en libre.")
  })
})



//CREATE COMMANDE
app.post("/commande-add/:numeroTable", (req, res) => {
  const q = "INSERT INTO `commandestables` (`table`, `dateCommande`, `statutCommande`) VALUES (?, CONVERT_TZ(NOW(),'+00:00','+00:00'), ?)";
  const table = req.params.numeroTable;
  const { statutCommande } = req.body;

  dataBase.query(q, [table, statutCommande], (err, data) => {
    if (err) return res.json(err);
    return res.json("Commande ajoutée avec succès.");
  });
});

//CREATE COMMANDE PLAT
app.post("/commande-plat-add/:numeroCommande", (req, res) => {
  const q = "INSERT INTO `contenircommandes` (`commande`, `platCommande`, `quantitePlat`) VALUES (?)"
  const values = [
    req.params.numeroCommande,
    req.body.platCommande,
    req.body.quantitePlat,
  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Plat ajouté avec succès.")
  })
})

//UPDATE QUANTITE COMMANDE PLAT
app.put("/commande-plat-update/:numeroCommande/:nomPlat", (req, res) => {
  const commande = req.params.numeroCommande
  const platCommande = req.params.nomPlat
  const q = "UPDATE `contenircommandes` SET `quantitePlat`=? WHERE commande = ? AND platCommande = ?";
  const values = [
    req.body.quantitePlat,
  ];

  dataBase.query(q, [...values, commande, platCommande], (err, data) => {
    if (err) return res.json(err)
    return res.json("Quantitée +1")
  })
})


//GET PLAT COMMANDE
app.get("/commande-plat/:numeroCommande/:nomPlat", (req, res) => {
  const q = "SELECT * FROM `contenircommandes` WHERE commande = ? AND platCommande = ? "
  const commande = req.params.numeroCommande
  const platCommande = req.params.nomPlat

  dataBase.query(q, [commande, platCommande], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//GET PRIX TOTAL PAR PLAT
app.get("/commande-plat-total/:numeroCommande/:nomPlat", (req, res) => {
  const q = "SELECT contenircommandes.quantitePlat * plats.prixPlat AS total FROM `contenircommandes` INNER JOIN `plats` ON plats.nomPlat = contenircommandes.platCommande WHERE commande = ? AND platCommande = ? "
  const commande = req.params.numeroCommande
  const platCommande = req.params.nomPlat

  dataBase.query(q, [commande, platCommande], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER COMMANDES
app.get("/commandes/:numeroTable", (req, res) => {
  const t = "SELECT * FROM `commandestables` WHERE `table` = ?"
  const table = req.params.numeroTable
  dataBase.query(t, [table], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//AFFICHER HISTORIQUE COMMANDE 
app.get("/historique-commandes/:numeroTable", (req, res) => {
  const numeroTable = req.params.numeroTable;
  const t = "SELECT * FROM `contenircommandes` WHERE `commande` = ?";
  const values = [numeroTable];

  dataBase.query(t, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//DELETE PLAT COMMANDE
app.delete("/plat-commande-delete/:id", (req, res) => {
  const tableId = req.params.id;
  const q = "DELETE FROM `contenircommandes` WHERE id = ?"

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Plat suprimé avec succès.")
  })
})

//DELETE COMMANDE
app.delete("/commande-delete/:id", (req, res) => {
  const tableId = req.params.id;
  const q = "DELETE FROM `commandestables` WHERE numeroCommande = ?"

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Commande suprimée avec succès.")
  })
})
//-------------------------------------------------------------------------------------------------

// REQUETES PAGE PLANNING-----------------------------------------------------------------------------
app.get("/salaries", (req, res) => {
  const salaries = "SELECT * FROM salaries"
  dataBase.query(salaries, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})
//-------------------------------------------------------------------------------------------------
// REQUETES PAGE menu-----------------------------------------------------------------------------
app.get("/menu", (req, res) => {
  const t = "SELECT * FROM `contenirmenu` WHERE menu='Menu du jour'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.get("/carte", (req, res) => {
  const t = "SELECT * FROM `contenirmenu` WHERE menu='Carte du restaurant'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})


app.post("/menu-add", (req, res) => {
  const q = "INSERT INTO `contenirmenu` (`menu`, `platMenu`) VALUES (?)"
  const values = [
    req.body.menu,
    req.body.platMenu,
  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Menu ajoutée avec succès.")
  })
})

app.delete("/menu-delete/:menu", (req, res) => {
  const menuId = req.params.menu;
  const q = "DELETE FROM `contenirmenu` WHERE menu = ?"

  dataBase.query(q, [menuId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Menu supprimé avec succès.")
  })
})


// REQUETES PAGE STOCKS-----------------------------------------------------------------------------
app.get("/ingredients", (req, res) => {
  const ingredients = "SELECT * FROM ingredients WHERE categorieIngredient = 'Ingredient'"
  dataBase.query(ingredients, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.get("/ingredientConso", (req, res) => {
  const ingredients = "SELECT * FROM ingredients WHERE categorieIngredient = 'Consommable'"
  dataBase.query(ingredients, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.get("/ingredientBoisson", (req, res) => {
  const ingredients = "SELECT * FROM ingredients WHERE categorieIngredient = 'Boisson'"
  dataBase.query(ingredients, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})


app.delete("/ingredient/:nomIngredient", (req, res) => {
  const deleteI = req.params.nomIngredient;
  const D = "DELETE FROM ingredients where nomIngredient = ?";

  dataBase.query(D, [deleteI], (err, data) => {
    if (err) return res.send(err);
    return res.json("Ingredient supprimé avec succès");
  })
})

app.get("/fournisseur", (req, res) => {
  const fourni = "SELECT * FROM fournisseurs"
  dataBase.query(fourni, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.delete("/fournisseur/:id", (req, res) => {
  const deleteF = req.params.id;
  const f = "DELETE FROM fournisseurs where id = ?";

  dataBase.query(f, [deleteF], (err, data) => {
    if (err) return res.send(err);
    return res.json("Fournisseur supprimé avec succès");
  })
})


app.post("/ajout-ingredients", (req, res) => {
  const i = "INSERT INTO `ingredients` (`nomIngredient`, `datePeremption`, `coutIngredient`, `fournisseur`, `stock`, `iconeUrl`, `categorieIngredient`) VALUES (?)"
  const values = [
    req.body.nomIngredient,
    req.body.datePeremption,
    req.body.coutIngredient,
    req.body.fournisseur,
    req.body.stock,
    req.body.iconeUrl,
    req.body.categorieIngredient,
  ];
  dataBase.query(i, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("ingredient ajouté avec succès")
  })
})

app.post("/modifs-ingredients/:nomIngredient", (req, res) => {
  const ingredientsM = req.params.nomIngredient;
  const i = "UPDATE `ingredients` SET 'nomIngredient'=?, 'stock'=?,"
  const values = [
    req.body.nomIngredient,
    req.body.stock,
  ];
  dataBase.query(i, [values, ingredientsM], (err, data) => {
    if (err) return res.json(err)
    return res.json("ingredient ajouté avec succès")
  })
})

app.get("/categorieStock", (req, res) => {
  const categoriestock = "SELECT * FROM categoriestock"
  dataBase.query(categoriestock, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//-------------------------------------------------------------------------------------------------
app.listen(5000, () => { console.log("le Server est lancé sur le port 5000") })