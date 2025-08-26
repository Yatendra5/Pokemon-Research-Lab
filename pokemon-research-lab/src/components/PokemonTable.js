// src/components/PokemonTable.js
import React from 'react';
import { useTable } from '@tanstack/react-table';
import { useSelector } from 'react-redux';

const PokemonTable = () => {
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  console.log(pokemons[0]); // Log the first Pokémon object

  const columns = React.useMemo(() => [
      {
     accessor: 'types',
     header: 'Type(s)',
     cell: ({ getValue }) => {
       const types = getValue();
       console.log(types); // Log the types value
       return Array.isArray(types) 
         ? types.map(typeObj => typeObj.type.name).join(' / ') 
         : 'N/A'; // Handle undefined or non-array types
     },
   }
   ,
    { accessor: 'hp', header: 'HP' },
    { accessor: 'attack', header: 'Attack' },
    { accessor: 'defense', header: 'Defense' },
    { accessor: 'specialAttack', header: 'Special Attack' },
    { accessor: 'specialDefense', header: 'Special Defense' },
    { accessor: 'speed', header: 'Speed' },
  ], []);

  const table = useTable({ columns, data: pokemons });

  return (
    <table {...table.getTableProps()} className="min-w-full">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...table.getTableBodyProps()}>
        {table.getRowModel().rows.map(row => {
          return (
            <tr {...row.getRowProps()}>
              {row.getVisibleCells().map(cell => (
                <td {...cell.getCellProps()}>{cell.render('cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PokemonTable;
