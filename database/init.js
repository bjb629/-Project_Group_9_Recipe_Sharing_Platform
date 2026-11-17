const Database = require("better-sqlite3");
const path = require("path");

// Create or open the recipe database
const db = new Database(path.join(__dirname, "recipes.db"));

// Enable foreign key relationships
db.pragma("foreign_keys = ON");

// Main recipes table
db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        image TEXT,
        rating REAL DEFAULT 0,
        meal_type TEXT,
        cuisine TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Additional recipe information
    CREATE TABLE IF NOT EXISTS recipe_details (
        recipe_id INTEGER PRIMARY KEY,
        description TEXT,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        cooking_time_minutes INTEGER,
        difficulty TEXT,
        FOREIGN KEY (recipe_id)
            REFERENCES recipes(id)
            ON DELETE CASCADE
    );

    -- Available dietary tags
    CREATE TABLE IF NOT EXISTS dietary_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );

    -- Connect recipes with their dietary tags
    CREATE TABLE IF NOT EXISTS recipe_dietary_tags (
        recipe_id INTEGER,
        tag_id INTEGER,
        PRIMARY KEY (recipe_id, tag_id),
        FOREIGN KEY (recipe_id)
            REFERENCES recipes(id)
            ON DELETE CASCADE,
        FOREIGN KEY (tag_id)
            REFERENCES dietary_tags(id)
            ON DELETE CASCADE
    );
`);

// Create an index for faster recipe searches
db.exec(`
    CREATE INDEX IF NOT EXISTS idx_recipe_title
    ON recipes(title);
`);

console.log("Recipe database initialized successfully!");
console.log("Database tables created successfully.");

// Close database connection
db.close();
