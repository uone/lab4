const recipes = [
    {
        title: 'Домашній борщ',
        category: 'Перша страва',
        time: 60,
        difficulty: 'Середня',
        description: 'Традиційна українська страва з буряком, капустою, картоплею та ароматними спеціями.'
    },
    {
        title: 'Паста з овочами',
        category: 'Основна страва',
        time: 25,
        difficulty: 'Легка',
        description: 'Швидка страва з макаронів, свіжих овочів, зелені та соусу.'
    },
    {
        title: 'Сирники',
        category: 'Сніданок',
        time: 30,
        difficulty: 'Легка',
        description: 'Ніжні сирники з кисломолочного сиру, які добре смакують зі сметаною або джемом.'
    },
    {
        title: 'Овочевий салат',
        category: 'Салат',
        time: 15,
        difficulty: 'Легка',
        description: 'Свіжий салат із помідорів, огірків, зелені та оливкової олії.'
    },
    {
        title: 'Домашня піца',
        category: 'Основна страва',
        time: 45,
        difficulty: 'Середня',
        description: 'Піца з домашнім тістом, сиром, томатним соусом та улюбленою начинкою.'
    },
    {
        title: 'Ягідний десерт',
        category: 'Десерт',
        time: 20,
        difficulty: 'Легка',
        description: 'Легкий десерт із сезонних ягід, йогурту та меду.'
    },
    {
        title: 'Омлет із зеленню',
        category: 'Сніданок',
        time: 10,
        difficulty: 'Легка',
        description: 'Швидкий білковий сніданок з яйцями, зеленню та сиром.'
    },
    {
        title: 'Курка з рисом',
        category: 'Основна страва',
        time: 50,
        difficulty: 'Середня',
        description: 'Поживна страва з курячого філе, рису та овочів.'
    },
    {
        title: 'Гарбузовий суп',
        category: 'Перша страва',
        time: 40,
        difficulty: 'Легка',
        description: 'Ніжний крем-суп із гарбуза з вершками та спеціями.'
    },
    {
        title: 'Шоколадний кекс',
        category: 'Десерт',
        time: 55,
        difficulty: 'Середня',
        description: 'Ароматний кекс із какао, який підходить до чаю або кави.'
    },
    {
        title: 'Грецький салат',
        category: 'Салат',
        time: 15,
        difficulty: 'Легка',
        description: 'Класичний салат із овочів, сиру фета, маслин та оливкової олії.'
    },
    {
        title: 'Млинці з сиром',
        category: 'Сніданок',
        time: 35,
        difficulty: 'Середня',
        description: 'Домашні млинці з ніжною сирною начинкою.'
    }
];

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const resetButton = document.getElementById('resetButton');
const recipeList = document.getElementById('recipeList');
const resultCount = document.getElementById('resultCount');
const searchError = document.getElementById('searchError');

let debounceTimer = null;

function createRecipeCard(recipe) {
    const card = document.createElement('article');
    card.classList.add('recipe-card');

    const category = document.createElement('span');
    category.classList.add('recipe-category');
    category.textContent = recipe.category;

    const title = document.createElement('h3');
    title.textContent = recipe.title;

    const meta = document.createElement('p');
    meta.classList.add('recipe-meta');
    meta.textContent = `Час: ${recipe.time} хв | Складність: ${recipe.difficulty}`;

    const description = document.createElement('p');
    description.textContent = recipe.description;

    card.appendChild(category);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(description);

    return card;
}

function renderRecipes(recipeArray) {
    recipeList.textContent = '';

    if (recipeArray.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty-message');
        emptyMessage.textContent = 'Рецептів за вашим запитом не знайдено.';
        recipeList.appendChild(emptyMessage);

        resultCount.textContent = 'Знайдено рецептів: 0';
        return;
    }

    recipeArray.forEach(function(recipe) {
        const card = createRecipeCard(recipe);
        recipeList.appendChild(card);
    });

    resultCount.textContent = `Знайдено рецептів: ${recipeArray.length}`;
}

function validateSearch(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length > 0 && trimmedValue.length < 2) {
        searchError.textContent = 'Введіть мінімум 2 символи для пошуку.';
        return false;
    }

    searchError.textContent = '';
    return true;
}

function filterRecipes() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const isValid = validateSearch(searchValue);

    if (!isValid) {
        renderRecipes(recipes);
        return;
    }

    const filteredRecipes = recipes.filter(function(recipe) {
        const matchesTitle = recipe.title.toLowerCase().includes(searchValue);
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;

        return matchesTitle && matchesCategory;
    });

    renderRecipes(filteredRecipes);
}

function debounceFilter() {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(function() {
        filterRecipes();
    }, 400);
}

function resetFilters() {
    searchInput.value = '';
    categoryFilter.value = 'all';
    searchError.textContent = '';
    renderRecipes(recipes);
}

searchInput.addEventListener('input', debounceFilter);
categoryFilter.addEventListener('change', filterRecipes);
resetButton.addEventListener('click', resetFilters);

renderRecipes(recipes);