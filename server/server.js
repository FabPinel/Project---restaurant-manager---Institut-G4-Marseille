const express = require('express')
const app = express()

app.get("/api", (req, res) => {
  res.json({"users": ["Cedric", "Fabien", "Jabir", "Aniss"] })  
})

app.listen(5000, () => {console.log("le Server est lancé sur le port 5000") })