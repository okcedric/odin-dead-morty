export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/?name=morty&status=dead"
    );
    const json = await response.json();
    const data = json.results.map((morty) => {
      return morty.name === "Morty Smith"
        ? { ...morty, name: "Morty (Replacement Dimension)" }
        : morty;
    });
    return data;
  } catch (error) {
    console.error(error);
    return null; // ou tu peux retourner une valeur par défaut ou lever une exception
  }
};
