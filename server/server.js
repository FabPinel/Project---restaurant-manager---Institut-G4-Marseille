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


//Requete ajout de salarié ---------------------------------------------------------------

app.post("/ajout-salaries", (req, res) => {
  const s = "INSERT into salaries (`mailSalarie`,`nomSalarie`,`prenomSalarie`,`naissanceSalarie`,`telephoneSalarie`,`adresseSalarie`,`salaireSalarie`,`posteSalaire`) VALUES (?)";
  const values = [
    req.body.mailSalarie,
    req.body.nomSalarie,
    req.body.prenomSalarie,
    req.body.naissanceSalarie,
    req.body.telephoneSalarie,
    req.body.adresseSalarie,
    req.body.salaireSalarie,
    req.body.posteSalaire,
  ];
  dataBase.query(s, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("salarie-ajouté avec succès")
  })
})


//Requete de suppresion des salariés-----------------------------------------------------------------
app.delete("/salaries/:id", (req, res) => {
  const deleteS = req.params.id;
  const q = " DELETE FROM salaries WHERE id = ? ";

  dataBase.query(q, [deleteS], (err, data) => {
    if (err) return res.send(err);
    return res.json("supprimé avec succés");
  });
});
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

// REQUETES PAGE PLATS-----------------------------------------------------------------------------

app.get("/Plat", (req, res) => {
  const t = "SELECT * FROM `plats`"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/plat-add", (req, res) => {
  const q = "INSERT INTO `plats` ( `nomPlat`, `descriptionPlat`, `prixPlat`, `categorie`, `imgPlat`) VALUES (?)"
  const values = [
    req.body.nomPlat,
    req.body.descriptionPlat,
    req.body.prixPlat,
    req.body.categorie,
    req.body.imgPlat,
  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Plats ajoutÃ©e avec succÃ¨s.")
  })
})

app.delete("/plat-delete/:idPlat", (req, res) => {
  const PlatsId = req.params.idPlat;
  const q = "DELETE FROM `plats` WHERE nomPlat = ?"

  dataBase.query(q, [PlatsId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Plat suprimÃ© avec succÃ¨s.")
  })
})

app.put("/PlatUpdate/:idPlat", (req, res) => {
  const PlatsId = req.params.idPlat;
  const q = "UPDATE `plats` SET `nomPlat`=?, `descriptionPlat`=?, `prixPlat`=?, `categorie`=?, `imgPlat`=? WHERE `idPlat`= ?";
  const values = [
    req.body.nomPlat,
    req.body.descriptionPlat,
    req.body.prixPlat,
    req.body.categorie,
    req.body.imgPlat,
  ];

  dataBase.query(q, [...values, PlatsId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Plats mise Ã  jour avec succÃ¨s.")
  })
})

//-----------------------------------------------------------------------------------------------------------------------------

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

app.put("/modifs-ingredients/:nomIngredient", (req, res) => {
  const ingredientsM = req.params.nomIngredient;
  const i = "UPDATE `ingredients` SET `nomIngredient`=?, `stock`=? WHERE `nomIngredient`=?";
  const values = [
    req.body.nomIngredient,
    req.body.stock,
  ];
  dataBase.query(i, [...values, ingredientsM], (err, data) => {
    if (err) return res.json(err);
    return res.json("ingredient modifié avec succès");
  });
})

app.get("/categorieStock", (req, res) => {
  const categoriestock = "SELECT * FROM categoriestock"
  dataBase.query(categoriestock, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//-------------------------------------------------------------------------------------------------

//PAGE FOURNISSEUR-----------------------------------------------------------------------------------------------
//CREATE FOURNISSEUR
app.post("/fournisseur-add", (req, res) => {
  const q = "INSERT INTO `fournisseurs` (`nomFournisseur`, `type`) VALUES (?)"
  const values = [
    req.body.nomFournisseur,
    req.body.type,
  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Fournisseur ajoutée avec succès.")
  })
})

//AFFICHER TOUTES LES COMMANDES
app.get("/commandes-fournisseurs", (req, res) => {
  const q = "SELECT * FROM commandesFournisseur"
  dataBase.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//CREATE COMMANDE FOURNISSEUR
app.post("/commande-fournisseur-add", (req, res) => {
  const q = "INSERT INTO commandesfournisseur (fournisseur, dateCommande, dateLivraison) VALUES (?, CONVERT_TZ(NOW(), '+00:00', '+00:00'), DATE(CONVERT_TZ(NOW(), '+00:00', '+00:00') + INTERVAL 3 DAY))"

  const fournisseur = req.body.nomFournisseurCommande;

  dataBase.query(q, [fournisseur], (err, data) => {
    if (err) return res.json(err);
    return res.json("Commande ajoutée avec succès.");
  });
});

//UPDATE COMMANDE FOURNISSEUR
app.put("/fournisseur-commande-update/:id", (req, res) => {
  const deleteF = req.params.id;
  const f = "UPDATE commandesfournisseur SET `statutCommandeFournisseur`='A valider' WHERE idCommande = ?";

  dataBase.query(f, [deleteF], (err, data) => {
    if (err) return res.send(err);
    return res.json("Commande fournisseur mise à jour avec succès");
  })
})

app.put("/fournisseur-commande-termine-update/:id", (req, res) => {
  const deleteF = req.params.id;
  const f = "UPDATE commandesfournisseur SET `statutCommandeFournisseur`='Terminé' WHERE idCommande = ?";

  dataBase.query(f, [deleteF], (err, data) => {
    if (err) return res.send(err);
    return res.json("Commande fournisseur mise à jour avec succès");
  })
})

//DELETE COMMANDE FOURNISSEUR
app.delete("/fournisseur-commande/:id", (req, res) => {
  const deleteF = req.params.id;
  const f = "DELETE FROM commandesfournisseur where idCommande = ?";

  dataBase.query(f, [deleteF], (err, data) => {
    if (err) return res.send(err);
    return res.json("Commande fournisseur supprimée avec succès");
  })
})

//AFFICHER INGREDIENTS COMMANDE 
app.get("/ingredients-commandes/:numeroCommande", (req, res) => {
  const numeroCommande = req.params.numeroCommande;
  const t = "SELECT * FROM `contenircommandesfournisseur` WHERE `nCommandeFournisseur` = ?";
  const values = [numeroCommande];

  dataBase.query(t, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//GET INGREDIENT COMMANDE FOURNISSEUR
app.get("/ingredients-commandes/:numeroCommande/:ingredient", (req, res) => {
  const q = "SELECT * FROM `contenircommandesfournisseur` WHERE nCommandeFournisseur = ? AND ingredient = ? "
  const commande = req.params.numeroCommande
  const ingredient = req.params.ingredient

  dataBase.query(q, [commande, ingredient], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

//INSERT INGREDIENT COMMANDE 
app.post("/ingredient-commande-add/:numeroCommande", (req, res) => {
  const q = "INSERT INTO `contenircommandesfournisseur` (`nCommandeFournisseur`, `ingredient`, `quantite`) VALUES (?)";
  const values = [
    req.params.numeroCommande,
    req.body.ingredient,
    req.body.quantite,
  ];

  dataBase.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Ingredient ajouté avec succès.")
  })
})

// UPDATE INGREDIENT COMMANDE FOURNISSEUR
app.put("/commande-ingredient-update/:numeroCommande/:ingredient", (req, res) => {
  const commande = req.params.numeroCommande
  const ingredient = req.params.ingredient
  const q = "UPDATE `contenircommandesfournisseur` SET `quantite`=? WHERE nCommandeFournisseur = ? AND ingredient = ?";
  const values = [
    req.body.quantite,
  ];

  dataBase.query(q, [...values, commande, ingredient], (err, data) => {
    if (err) return res.json(err)
    return res.json("Quantitée +1")
  })
})


//DELETE INGREDIENT COMMANDE FOURNISSEUR
app.delete("/ingredient-commande-delete/:id", (req, res) => {
  const tableId = req.params.id;
  const q = "DELETE FROM `contenircommandesfournisseur` WHERE id = ?"

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Ingrédient de la commande suprimé avec succès.")
  })
})

//RECUPERER TOUS LES INGREDIENTS
app.get("/get-ingredient/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;
  const selectIngredient = `SELECT * FROM ingredients WHERE nom = '${ingredient}'`;
  dataBase.query(selectIngredient, (err, data) => {
    if (err) return res.json(err)
    return res.json(data[0]);
  })
})

//RECUPERER TOUS LE STOCK
app.get("/get-stocks", (req, res) => {
  const stocks = `SELECT * FROM ingredients`;
  dataBase.query(stocks, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


//UPDATE AJOUT QUANTITE INGREDIENT
app.put("/update-stock/:nomIngredient", (req, res) => {
  const nomIngredient = req.params.nomIngredient;
  const stock = req.body.stock;
  const query = "UPDATE ingredients SET stock = ? WHERE nomIngredient = ?";
  dataBase.query(query, [stock, nomIngredient], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la mise à jour du stock");
    } else {
      console.log("Stock mis à jour pour " + nomIngredient);
      res.status(200).send("Stock mis à jour pour " + nomIngredient);
    }
  });
});

// RECUPERER COMMANDES FOURNISSEUR
app.get("/get-commande-fournisseur/:idCommande", (req, res) => {
  const idCommande = req.params.idCommande;
  const stocks = `SELECT * FROM commandesfournisseur WHERE idCommande=?`;
  dataBase.query(stocks, [idCommande], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//------------------------------------------------------------------------------------------------
app.listen(5000, () => { console.log("le Server est lancé sur le port 5000") })