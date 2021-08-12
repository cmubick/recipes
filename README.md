# Requirements

* Profile
    * Views
        * Sign up
        * Login
        * Logout
        * Profile details
        * Update profile
    * Model
        * Full name
        * Email
        * Password
        * Username (optional)
        * Allergies (optional)
        * Birthdate (optional)
        * Gender (optional)
        * Household Size (optional)
        * Number kids (optional)
            * Kid age
            * Allergies
        * Preferences (see Preference model)
* Preferences (Stretch)
    * Views
        * Create
        * Read
        * Update
        * Delete
    * Model
        * Prefer_Organic
        * Prefer_Low_Cost
        * Prefer_Vegan
        * Prefer_Kid_Friendly
        * etc..
* Recipe
    * Views
        * Create
        * Read
        * Update
        * Delete (soft)
    * Model
        * Name
        * Description
        * Number servings
        * Image (stretch) (GUID)
        * Ingredient List (See Ingredient model)
        * Steps (Ordered List of strings)
* Ingredient
    * Views
        * Create
        * Read
        * Update
    * Model
        * Name
        * Unit type
        * Image (stretch)
        * Allergen type (stretch)
        * Nutritional facts (stretch)
        * Average cost (stretch)
* Meal Planner
    * Views
        * Create
        * Read
        * Update
        * Delete
    * Model
        * Name
        * Week (Date range)
        * Recipe List (See Recipe model)
* Shopping List (of Ingredients)
    * Views
        * Create
        * Read
        * Update
    * Model (generated from exiting meal plan)
        * Preferences (See preferences model) (stretch)
        * Date (multiple days based on planner dates?)

# Technologies
https://doug-martin.github.io/nestjs-query/
https://www.primefaces.org/primevue/
https://v3.vuejs.org/
https://docs.nestjs.com/
