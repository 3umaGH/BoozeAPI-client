const BASE_PATH = `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}`;

const fetchData = async (link) => {
  const response = await fetch(link);

  if (response.status !== 200)
    throw new Error("Unable to fetch data. Status: " + response.status);

  const data = await response.json();

  return data;
};

export const fetchCocktail = async (useRandom, id) => {
  const link = useRandom
    ? `${BASE_PATH}/random.php`
    : `${BASE_PATH}/lookup.php?i=${id}`;

  return fetchData(link);
};

export const fetchCocktailsByName = async (name) => {
  const link = `${BASE_PATH}/search.php?s=${name}`;

  return fetchData(link);
};

export const fetchCocktailsBy = async (
  category,
  glass,
  ingredients,
  alcoholic
) => {
  let queryParams = [];

  if (category !== undefined && category !== "")
    queryParams.push(`c=${category}`);

  if (glass !== undefined && glass !== "") queryParams.push(`g=${glass}`);

  if (ingredients !== undefined && ingredients !== "")
    queryParams.push(`i=${ingredients}`);

  if (alcoholic !== undefined && alcoholic !== "")
    queryParams.push(`a=${alcoholic}`);

  const queryString = queryParams.join("&");
  const link = `${BASE_PATH}/filter.php${queryString ? `?${queryString}` : ""}`;

  console.log(link.replace(" ", "%20"));
  return fetchData(link.replace(" ", "%20"));
};

export const fetchPopularCocktails = async () => {
  const link = `${BASE_PATH}/popular.php`;

  return fetchData(link);
};

export const fetch10RandomCocktails = async () => {
  const link = `${BASE_PATH}/randomSelection.php`;

  return fetchData(link);
};

export const fetchSearchParameters = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = [];

      const endpoints = ["c", "g", "i", "a"]; // Category, glass type, ingredients, alcoholic or not

      for (const endpoint of endpoints) {
        const data = await fetchData(`${BASE_PATH}/list.php?${endpoint}=list`);
        result.push(data);
      }

      resolve(result);
    } catch (error) {
      reject("Error fetching search parameters data:", error);
    }
  });
};

export const parseIngredients = (drink) => {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];

    if (ingredient != null) {
      let format = ingredient;

      if (drink[`strMeasure${i}`] != null)
        format = drink[`strMeasure${i}`] + " " + ingredient;

      ingredients.push(format);
    }
  }

  return ingredients;
};
