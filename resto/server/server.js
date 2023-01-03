// const express = require('express');
import express from 'express'
import cors from 'cors'
// const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFourth"] });
  });

app.listen(5000, () => {console.log(`Le server se lance sur le port 5000.`) });

