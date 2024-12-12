const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoute = require('./routes/recipe');
const infoRoutes = require('./routes/api');

const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connexion à MongoDB réussie");
    })
    .catch((error) => {
        console.error("Erreur de connexion à MongoDB :", error);
    });

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/recipe", recipeRoute);
app.use("/api", infoRoutes);

// Export de l'application pour Vercel
module.exports = app;