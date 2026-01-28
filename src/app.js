import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';

document.addEventListener('DOMContentLoaded', () => {
  $('#tblPokemon').DataTable();
});