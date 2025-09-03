export default function normalizePokemon(apiDetailed) {
  const stats = {};
  (apiDetailed.stats || []).forEach((s) => (stats[s.stat.name] = s.base_stat));
  return {
    id: apiDetailed.id,
    name: apiDetailed.name,
    sprite: apiDetailed.sprites?.front_default || "",
    types: (apiDetailed.types || []).map((t) => t.type.name),
    hp: stats["hp"] ?? 0,
    attack: stats["attack"] ?? 0,
    defense: stats["defense"] ?? 0,
    "special-attack": stats["special-attack"] ?? 0,
    "special-defense": stats["special-defense"] ?? 0,
    speed: stats["speed"] ?? 0,
    generation: null,
  };
}
