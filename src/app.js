import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';

document.addEventListener('DOMContentLoaded', async () => {
  const table = $('#tblPokemon').DataTable();
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
  const p = await res.json();

  table.row.add([
    p.id.toString().padStart(3, '0'),
    p.name,
    "grass",
    "abilities",
    "baseStats",
    "Kanto"
  ]).draw();
  
});