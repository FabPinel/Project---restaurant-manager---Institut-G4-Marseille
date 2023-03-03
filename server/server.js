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

// REQUETES PAGE SALLE-----------------------------------------------------------------------------
app.get("/tables-salle1", (req, res) => {
  const t = "SELECT * FROM `tables` WHERE salle = 'Salle1'"
  dataBase.query(t, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.get("/nombres-reservations-salle1", (req, res) => {
  const nbr = "SELECT count(reservation) FROM `tables` HAVING count(reservation) IS NOT NULL"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

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

app.delete("/table-delete/:id", (req, res) => {
  const tableId = req.params.id;
  const q = "DELETE FROM `tables` WHERE numeroTable = ?"

  dataBase.query(q, [tableId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Table suprimé avec succès.")
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

app.get("/api", (req, res) => {
  res.json({ "users": ["Cedric", "Fabien", "Jabir", "Aniss"] })
})

app.listen(5000, () => { console.log("le Server est lancé sur le port 5000") })