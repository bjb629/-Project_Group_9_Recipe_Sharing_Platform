/*


----DATABSE SEED FILE----


*/

const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(
    path.join(__dirname, "database", "recipes.db")
);


const existingRecipes = db.prepare(
    "SELECT COUNT(*) AS count FROM recipes"
).get();

if (existingRecipes.count > 0) {
    console.log("Sample recipes already exist. No duplicates added.");
    db.close();
    process.exit();
}


const insertRecipe = db.prepare(`
    INSERT INTO recipes
    (title, image, rating, meal_type)
    VALUES (?, ?, ?, ?)
`);

const insertDetails = db.prepare(`
    INSERT INTO recipe_details
    (recipe_id, ingredients, instructions,
     cooking_time_minutes, difficulty)
    VALUES (?, ?, ?, ?, ?)
`);


const recipes = [
    {
        title: "Pancakes",
        image: "images/pancakes.jpg",
        rating: 4.8,
        mealType: "Breakfast",
        ingredients: "eggs, milk, flour, sugar",
        instructions: "Mix the eggs, milk, flour, and sugar. Pour batter onto a heated pan. Cook both sides until golden.",
        cookingTime: 20,
        difficulty: "Easy"
    },
    {
        title: "Fettuccine Alfredo",
        image: "images/pasta.jpg",
        rating: 4.9,
        mealType: "Dinner",
        ingredients: "pasta, garlic, cream, cheese, salt, pepper",
        instructions: "Cook the pasta. Prepare a sauce using garlic, cream, and cheese. Combine the pasta and sauce, then season with salt and pepper.",
        cookingTime: 30,
        difficulty: "Medium"
    },
    {
        title: "Chocolate Chip Cookies",
        image: "images/cookies.jpeg",
        rating: 4.7,
        mealType: "Dessert",
        ingredients: "chocolate chips, flour, eggs, sugar",
        instructions: "Mix the flour, eggs, and sugar. Fold in chocolate chips. Shape the dough and bake until the edges are golden.",
        cookingTime: 25,
        difficulty: "Easy"
    },
    {
        title: "Chicken Salad",
        image: "images/salad.jpg",
        rating: 4.6,
        mealType: "Lunch",
        ingredients: "chicken, celery, mayonnaise, almonds",
        instructions: "Prepare and chop the cooked chicken. Combine with celery, mayonnaise, and almonds. Mix and serve.",
        cookingTime: 20,
        difficulty: "Easy"
    },
    {
        title: "French Toast",
        image: "images/french-toast.jpg",
        rating: 4.8,
        mealType: "Breakfast",
        ingredients: "bread, eggs, milk, cinnamon",
        instructions: "Whisk eggs, milk, and cinnamon. Dip bread into the mixture and cook in a heated pan until both sides are golden.",
        cookingTime: 15,
        difficulty: "Easy"
    },
    {
        title: "Chicken Burgers",
        image: "images/chicken-burger.jpg",
        rating: 4.5,
        mealType: "Dinner",
        ingredients: "buns, chicken, mayo, pickles, lettuce",
        instructions: "Prepare and cook the chicken patties thoroughly. Place them on buns with mayonnaise, pickles, and lettuce.",
        cookingTime: 30,
        difficulty: "Medium"
    }
];

const seedRecipes = db.transaction(function() {
    recipes.forEach(function(recipe) {
        const result = insertRecipe.run(
            recipe.title,
            recipe.image,
            recipe.rating,
            recipe.mealType
        );

        insertDetails.run(
            result.lastInsertRowid,
            recipe.ingredients,
            recipe.instructions,
            recipe.cookingTime,
            recipe.difficulty
        );
    });
});

seedRecipes();

console.log("Six sample recipes added successfully!");

 
db.close();
