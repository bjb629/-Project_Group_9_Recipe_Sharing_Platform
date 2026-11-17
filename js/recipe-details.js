const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id");


const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const recipeDetails = document.getElementById("recipeDetails");


async function loadRecipe() {

    if (!recipeId || !/^\d+$/.test(recipeId)) {
        loadingMessage.hidden = true;
        errorMessage.textContent = "Invalid recipe ID.";
        return;
    }

    try {

        const response = await fetch(`/api/recipes/${recipeId}`);

        if (!response.ok) {
            throw new Error("Recipe not found.");
        }

        const recipe = await response.json();

        document.getElementById("recipeTitle").textContent =
            recipe.title;

        document.getElementById("recipeRating").textContent =
            `Rating: ${recipe.rating}/5`;

        const recipeImage = document.getElementById("recipeImage");

        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;

        document.getElementById("recipeMealType").textContent =
            recipe.meal_type || "Not specified";

        document.getElementById("recipeCookingTime").textContent =
            `${recipe.cooking_time_minutes} minutes`;

        document.getElementById("recipeDifficulty").textContent =
            recipe.difficulty;

        const ingredientList =
            document.getElementById("recipeIngredients");

        ingredientList.innerHTML = "";

        recipe.ingredients.split(",").forEach(function(ingredient) {

            const listItem = document.createElement("li");

            listItem.textContent = ingredient.trim();

            ingredientList.appendChild(listItem);

        });

        document.getElementById("recipeInstructions").textContent =
            recipe.instructions;

        loadingMessage.hidden = true;
        recipeDetails.hidden = false;

    } catch (error) {

        loadingMessage.hidden = true;
        errorMessage.textContent =
            "Unable to load recipe. Please try again.";

        console.error(error);

    }

}

loadRecipe();
