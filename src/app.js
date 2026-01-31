// importing data tables with bootstrap and jQuery using Vite
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';

// things that need to happen on page load
document.addEventListener('DOMContentLoaded', async () => {
  // creates dataTable
  const table = $('#tblPokemon').DataTable({
    paging: true,
    searching: true,
    ordering: true
  });
  
  // fetch calls to pokeapi grabbing the first pokemon
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  const allPokemon = [];

  while (url) {
    const res = await fetch(url);
    const data = await res.json();

    allPokemon.push(...data.results);
    url = data.next;
  }
  // grab the first pokemon
  const pokemonRef = allPokemon[0];
  const res = await fetch(pokemonRef.url);
  const pokemon = await res.json();
  // using map to get base stat data
  const statMap = Object.fromEntries(
    pokemon.stats.map(s => [s.stat.name, s.base_stat])
  );
  // since the dataTable already exists, we can add a row this way rather than adding to the HTML
  table.row.add([
    pokemon.id.toString().padStart(3, '0'),
    pokemon.name,
    pokemon.types.map(t => t.type.name).join(', '),
    pokemon.abilities.map(a => a.ability.name).join(', '),

    statMap.hp,
    statMap.attack,
    statMap.defense,
    statMap['special-attack'],
    statMap['special-defense'],
    statMap.speed
  ]).draw();
  
});

