const infos = [
    {
        id: 1,
        category: "Entrées",
        description: "Une sélection de recettes pour commencer le repas."
    },
    {
        id: 2,
        category: "Plats",
        description: "Les plats principaux pour vos déjeuners et dîners."
    },
    {
        id: 3,
        category: "Desserts",
        description: "Des douceurs pour terminer le repas en beauté."
    }
];

const getAll = (req, res) => {
    res.json(infos);
}

module.exports = {
    getAll,
}