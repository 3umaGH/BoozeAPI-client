const RANDOM_LINK = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const SPECIFIC_ID = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const fetchData = async (link) => {
  const response = await fetch(link);

  if (response.status !== 200)
    throw new Error("Unable to fetch data. Status: " + response.status);

  const data = await response.json();

  return data;
};

export const fetchCocktail = async (useRandom, id) => {
  const link = useRandom ? RANDOM_LINK : SPECIFIC_ID + id;

  return fetchData(link);
};

export const fetchPopularCocktails = async () => {
  const link = `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/popular.php`;
  
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
