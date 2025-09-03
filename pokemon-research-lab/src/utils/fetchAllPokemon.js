import axios from "axios";
import normalizePokemon from "./normalizePokemon";

/**
 * Fetch a single page of pokemon (limit, offset).
 * Example: fetchPokemonPage(0, 20) -> first 20 pokemon
 */
export async function fetchPokemonPage(offset = 0, limit = 20) {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const baseList = await axios.get(url);
  const results = baseList.data.results || [];

  const detailed = await Promise.all(
    results.map((r) =>
      axios.get(r.url)
        .then((res) => normalizePokemon(res.data))
        .catch(() => null)
    )
  );

  return detailed.filter(Boolean);
}
