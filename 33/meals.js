const loadMeals = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meal-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal =>{
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div onclick = "loadMealsDetails(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            </div>
        </div>
        `;
        mealsContainer.appendChild(mealDiv);
    })
}

const searchFood = () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    loadMeals(searchText);
    searchInput.value = '';
}

const loadMealsDetails = (idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealsDetails(data.meals[0]));
}

const displayMealsDetails = meal =>{
    const detailsContainer = document.getElementById('details-container');
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');
    mealDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            </div>
    `;
    detailsContainer.appendChild(mealDiv);
}


loadMeals('');