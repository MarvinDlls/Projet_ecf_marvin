const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoute = require('./routes/recipe');
const infoRoutes = require ('./routes/api');

mongoose.connect("mongodb://localhost:27017/recipe")
    .then(() => {
        console.log("Connexion effectuée");
    }).catch((error) => {
        console.log(error);
    })

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipe", recipeRoute);
app.use("/api", infoRoutes);

app.listen(3001, () => {
    console.log("L'API est lancée sur l'url http://localhost:3001");
})