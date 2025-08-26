// src/components/CSVUpload.js
import React from 'react';
import Papa from 'papaparse';
import { useDispatch } from 'react-redux';
import { setPokemons } from '../store/pokemonSlice';

const CSVUpload = () => {
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          dispatch(setPokemons(results.data));
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default CSVUpload;
