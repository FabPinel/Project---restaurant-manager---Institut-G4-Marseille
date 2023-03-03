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

app.get("/api", (req, res) => {
  res.json({ "users": ["Cedric", "Fabien", "Jabir", "Aniss"] })
})

app.listen(5000, () => { console.log("le Server est lancé sur le port 5000") })