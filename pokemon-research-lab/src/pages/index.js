// src/pages/index.js
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import useFetchPokemons from '../hooks/useFetchPokemons';
import PokemonTable from '../components/PokemonTable';
import CSVUpload from '../components/CSVUpload';

const Home = () => {
  useFetchPokemons();

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">The Pokemon Research Lab</h1>
        <CSVUpload />
        <PokemonTable />
      </div>
    </Provider>
  );
};

export default Home;
