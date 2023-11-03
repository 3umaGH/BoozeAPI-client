const BASE_PATH = `https://www.boozeapi.com/api`;

const fetchData = async (link) => {
  const response = await fetch(link);

  if (response.status !== 200 && response.status !== 404)
    throw new Error("Unable to fetch data. Status: " + response.status);

  const data = await response.json();

  return data;
};

export const fetchCocktail = async (useRandom, ids) => {
  const link = useRandom
    ? `${BASE_PATH}/lookup/random/1`
    : `${BASE_PATH}/cocktails/${ids.join(",")}`;
  return fetchData(link);
};

export const fetchCocktailsByName = async (name) => {
  const link = `${BASE_PATH}/cocktail/?name=${name}`;

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
    queryParams.push(`category=${encodeURIComponent(category)}`);

  if (glass !== undefined && glass !== "")
    queryParams.push(`glass=${encodeURIComponent(glass)}`);

  if (ingredients !== undefined && ingredients.length > 0)
    queryParams.push(`ingredients=${ingredients}`);

  if (alcoholic !== undefined && alcoholic !== "")
    queryParams.push(`alcoholic=${encodeURIComponent(alcoholic)}`);

  const queryString = queryParams.join("&");
  const link = `${BASE_PATH}/cocktail/${queryString ? `?${queryString}` : ""}`;

  return fetchData(link);
};

export const fetchPopularCocktails = async () => {
  const link = `${BASE_PATH}/lookup/popular`;

  return fetchData(link);
};

export const fetchRandomCocktails = async () => {
  const link = `${BASE_PATH}/lookup/random/?amount=20`;

  return fetchData(link);
};

export const fetchSearchParameters = async () => {
  const link = `${BASE_PATH}/list`;

  return fetchData(link);
};
