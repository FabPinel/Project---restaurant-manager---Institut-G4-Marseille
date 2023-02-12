const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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

dataBase.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); });

app.get("/categories", (req, res) => { // pour chaque nouvelle requete il faut changer le "/" 
  const q = "SELECT * FROM categories"
  dataBase.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

// REQUETES PAGE SALLE
app.get("/tables-salle1", (req, res) => {
  const t = "SELECT * FROM `tables` WHERE salle = 'Salle1'"
  dataBase.query(t,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/nombres-reservations-salle1", (req, res) => {
  const nbr = "SELECT count(reservation) FROM `tables` HAVING count(reservation) IS NOT NULL"
  dataBase.query(nbr,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/api", (req, res) => {
  res.json({"users": ["Cedric", "Fabien", "Jabir", "Aniss"] })  
})

app.listen(5000, () => {console.log("le Server est lancé sur le port 5000") })