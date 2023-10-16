const BASE_PATH = `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}`;

const fetchData = async (link) => {
  const response = await fetch(link);

  if (response.status !== 200)
    throw new Error("Unable to fetch data. Status: " + response.status);

  const data = await response.json();

  return data;
};

export const fetchCocktail = async (useRandom, id) => {
  const link = useRandom ? `${BASE_PATH}/random.php` : `${BASE_PATH}/lookup.php?i=${id}`;

  return fetchData(link);
};

export const fetchCocktailsByName = async (name) => {
  const link = `${BASE_PATH}/search.php?s=${name}`

  return fetchData(link);
};

export const fetchPopularCocktails = async () => {
  const link = `${BASE_PATH}/popular.php`

  return fetchData(link);
};

export const fetch10RandomCocktails = async () => {
  const link = `${BASE_PATH}/randomSelection.php`

  return fetchData(link);
};


export const parseIngredients = (drink) => {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];

    if (ingredient != null) {
      let format = ingredient;

      if (drink[`strMeasure${i}`] != null)
        format = ingredient + " : " + drink[`strMeasure${i}`];

      ingredients.push(format);
    }
  }

  return ingredients;
};
