
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/recipes", (req, res) => {
    const recipe = req.body;

    if (!recipe.title || !recipe.ingredients || !recipe.instructions ||
        !recipe.cookTime || !recipe.difficulty || !recipe.mealType) {
        return res.status(400).json({
            message: "Please fill out all required fields."
        });
    }

    res.status(201).json({
        message: "Recipe received successfully!",
        recipe: recipe
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
