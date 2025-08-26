
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPokemons } from '../store/pokemonSlice';

const useFetchPokemons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async () => {
      const allPokemons = [];
      for (let i = 0; i < 66; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${i * 20}&limit=20`);
        const data = await response.json();
        allPokemons.push(...data.results);
      }
      dispatch(setPokemons(allPokemons));
    };

    fetchPokemons();
  }, [dispatch]);
};

export default useFetchPokemons;
