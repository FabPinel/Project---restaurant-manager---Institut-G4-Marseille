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

app.get("/nombres-reservations-salle1", (req, res) => {
  const nbr = "SELECT count(reservation) FROM `tables` HAVING count(reservation) IS NOT NULL"
  dataBase.query(nbr, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
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

//CREATE COMMANDE
app.post("/commande-add/:numeroTable", (req, res) => {
  const q = "INSERT INTO `commandestables` (`table`, `dateCommande`) VALUES (?, CONVERT_TZ(NOW(),'+00:00','+01:00'))";
  const table = req.params.numeroTable

  dataBase.query(q, [table], (err, data) => {
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

//AFFICHER COMMANDE
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

app.listen(5000, () => { console.log("le Server est lancé sur le port 5000") })