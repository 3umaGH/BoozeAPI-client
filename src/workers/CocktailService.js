const BASE_PATH = `https://cocktail-db-api.vercel.app`;

const fetchData = async (link) => {
  const response = await fetch(link);

  if (response.status !== 200)
    throw new Error("Unable to fetch data. Status: " + response.status);

  const data = await response.json();

  return data;
};

export const fetchCocktail = async (useRandom, ids) => {
  const link = useRandom
    ? `${BASE_PATH}/lookup/random/1`
    : `${BASE_PATH}/cocktails/${ids.join(',')}`;

    console.log("flink",link);
  return fetchData(link);
};

export const fetchCocktailsByName = async (name) => {
  const link = `${BASE_PATH}/search/?name=${name}`;

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

  return fetchData(link.replace(" ", "%20"));
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