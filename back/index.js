const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoute = require('./routes/recipe');
const infoRoutes = require('./routes/api');

// Configuration de la connexion MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/recipe";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connexion MongoDB effectuée");
    })
    .catch((error) => {
        console.error("Erreur de connexion à MongoDB :", error);
    });

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/recipe", recipeRoute);
app.use("/api", infoRoutes);

// Configuration du port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`L'API est lancée sur l'url http://localhost:${PORT}`);
});