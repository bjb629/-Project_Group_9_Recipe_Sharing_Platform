
document.getElementById("recipeForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const cookTime = document.getElementById("cookTime").value;
    const difficulty = document.getElementById("difficulty").value;
    const mealType = document.getElementById("mealType").value;
    
const dietary = Array.from(document.querySelectorAll('input[name="dietary"]:checked')).map(function(checkbox) {
    return checkbox.value;
});


    if (!title || !ingredients || !instructions || !cookTime || !difficulty || !mealType) {
        alert("Please fill out all required fields.");
        return;
    }

    if (Number(cookTime) <= 0) {
        alert("Cooking time must be greater than 0.");
        return;
    }

    const recipe = {
        title,
        ingredients,
        instructions,
        cookTime: Number(cookTime),
        difficulty,
        mealType,
        dietary
    };

    try {
        const response = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Recipe submitted successfully!");
            document.getElementById("recipeForm").reset();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Error occured when submitting recipe");
    }
});
