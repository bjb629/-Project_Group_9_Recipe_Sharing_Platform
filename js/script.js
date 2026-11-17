const recipes = [
    {
        id: 1,
        title: "Pancakes",
        image: "images/pancakes.jpg",
        rating: 4.8,
        mealType: "Breakfast",
        ingredients: "eggs, milk, flour, sugar"
    },
    {
        id: 2,
        title: "Fettuccine Alfredo",
        image: "images/pasta.jpg",
        rating: 4.9,
        mealType: "Dinner",
        ingredients: "pasta, garlic, cream, cheese, salt, pepper"
    },
    {
        id: 3,
        title: "Chocolate Chip Cookies",
        image: "images/cookies.jpeg",
        rating: 4.7,
        mealType: "Dessert",
        ingredients: "chocolate chips, flour, eggs, sugar"
    },
    {
        id: 4,
        title: "Chicken Salad",
        image: "images/salad.jpg",
        rating: 4.6,
        mealType: "Lunch",
        ingredients: "chicken, celery, mayonnaise, almonds"
    },
    {
        id: 5,
        title: "French Toast",
        image: "images/french-toast.jpg",
        rating: 4.8,
        mealType: "Breakfast",
        ingredients: "bread, eggs, milk, cinnamon"
    },
    {
        id: 6,
        title: "Chicken Burgers",
        image: "images/chicken-burger.jpg",
        rating: 4.5,
        mealType: "Dinner",
        ingredients: "buns, chicken, mayo, pickles, lettuce"
    }
];

// current search and category selections
let currentSearch = "";
let currentCategory = "All";

// display recipe cards
function displayRecipes(recipeList) {
    const recipeContainer =
        document.getElementById("recipeContainer");

    const searchMessage =
        document.getElementById("searchMessage");

    recipeContainer.innerHTML = "";

    if (recipeList.length === 0) {
        searchMessage.textContent = "No recipes found.";
        return;
    }

    searchMessage.textContent = "";

    recipeList.forEach(function(recipe) {
        const card = document.createElement("div");

        card.className = "recipe-card";

        card.innerHTML = `
            <a href="recipe-details.html?id=${recipe.id}">
                <img src="${recipe.image}"
                     alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            </a>
            <p>Rating: ${recipe.rating}/5</p>
        `;

        recipeContainer.appendChild(card);
    });
}

// search recipes by matching words
function searchRecipes() {
    const searchInput =
        document.getElementById("searchInput");

    currentSearch = searchInput.value.toLowerCase().trim();

    filterRecipes();
}

function filterCategory(category) {
    currentCategory = category;

    filterRecipes();
}

function filterRecipes() {
    const filteredRecipes = recipes.filter(function(recipe) {
        const matchesSearch =
            recipe.title.toLowerCase().includes(currentSearch) ||
            recipe.ingredients.toLowerCase().includes(currentSearch);

        const matchesCategory =
            currentCategory === "All" ||
            recipe.mealType === currentCategory;

        return matchesSearch && matchesCategory;
    });

    displayRecipes(filteredRecipes);
}

document.getElementById("searchInput").addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            searchRecipes();
        }
    }
);

displayRecipes(recipes);