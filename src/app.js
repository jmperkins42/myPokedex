// importing data tables with bootstrap and jQuery using Vite
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';

// things that need to happen on page load
document.addEventListener('DOMContentLoaded', async () => {
  // creates dataTable
  const table = $('#tblPokemon').DataTable();
  
  // fetch calls to pokeapi grabbing the first pokemon
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
  const p = await res.json();
  
  // since the dataTable already exists, we can add a row this way rather than adding to the HTML
  // table.row.add([
  //   p.id.toString().padStart(3, '0'),
  //   p.name,
  //   p.type,
  //   p.abilities.ability.name,
  //   p.stats,
  //   p.game-indices.version.name
  // ]).draw();
  
});

// let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
// const allPokemon = [];

// while (url) {
//   const res = await fetch(url);
//   const data = await res.json();

//   allPokemon.push(...data.results);
//   url = data.next;
// }