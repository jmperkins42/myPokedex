import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';

document.addEventListener('DOMContentLoaded', async () => {
  $('#tblPokemon').DataTable();
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
  const p = await res.json();

  table.row.add([
    pokemon.id.toString().padStart(3, '0'),
    pokemon.name,
    "grass",
    "abilities",
    "baseStats",
    "Kanto"
  ]).draw();
  
});