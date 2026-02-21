// importing data tables with bootstrap and jQuery using Vite
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';

// fetch calls to pokeapi grabbing the first pokemon
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  let allPokemon = [];   

// things that need to happen on page load
document.addEventListener('DOMContentLoaded', async () => {
  // creates dataTable
  const table = $('#tblPokemon').DataTable({
    paging: true,
    searching: true,
    ordering: true
  });

  while (url) {
    const res = await fetch(url);
    const data = await res.json();

    allPokemon.push(...data.results);
    url = data.next;
  }

  const detailedPokemon = []

  // need to look at better implementations of this

  // loop through all the pokemon and add them to the table one by one
  // 1025 is the # of individual pokemon according to serebii
  for (let i = 0; i < 1025; i++)
  {
    const pokemonRef = allPokemon[i];
    const res = await fetch(pokemonRef.url);
    const pokemon = await res.json();
    // using map to get base stat data
    const statMap = Object.fromEntries(
      pokemon.stats.map(s => [s.stat.name, s.base_stat])
    );
    // since the dataTable already exists, we can add a row this way rather than adding to the HTML
    detailedPokemon.push({
      id: pokemon.id,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), // capitalize first letter
      types: pokemon.types.map(t => t.type.name),
      abilities: pokemon.abilities.map(a => a.ability.name),
      stats: {
        hp: statMap.hp,
        atk: statMap.attack,
        def: statMap.defense,
        spa: statMap['special-attack'],
        spd: statMap['special-defense'],
        spe: statMap.speed
      }
    });
  }

  // fixes scope issues with the filter function and allows us to 
  // keep all the pokemon data in memory for filtering
  allPokemon = detailedPokemon;

  function refreshTable(pokemonList) {
    const rows = pokemonList.map(p => [
      p.id.toString().padStart(3, '0'),
      p.name,
      p.types.join(', '),
      p.abilities.join(', '),
      p.stats.hp,
      p.stats.atk,
      p.stats.def,
      p.stats.spa,
      p.stats.spd,
      p.stats.spe
    ]);

    table.clear().rows.add(rows).draw();
  }

  // populate table initially after data is loaded
  refreshTable(allPokemon);

  function applyFilters(){
    const maxNum = getGenMax(filters.generation)
    const filtered = allPokemon.filter(p => {

      // Generation based on maxNum which is determined by the generation filter
      if (p.id > maxNum){
        return false;
      }

      // Types
      if (filters.types.length > 0) {
        const hasAllTypes = filters.types.every(t => p.types.includes(t));
        if (!hasAllTypes) return false;
      }

      // Stats
      for (const stat in filters.stats){
        const { min, max } = filters.stats[stat];
        const value = p.stats[stat];

        if (min !== null && value < min) return false;
        if (max !== null && value > max) return false;
      }
      
      return true;
    });

    refreshTable(filtered);
  }

  document.getElementById('applyFilters').addEventListener('click', () => {
    // gets generation
    filters.generation = Number(document.getElementById('genFilter').value);

    // selected types
    filters.types = Array.from(
      document.querySelectorAll('#typeFilter input:checked')
    ).map(cb => cb.value);

    // gets max or mins
    filters.stats.hp.min = getNumber('hpMin');
    filters.stats.hp.max = getNumber('hpMax');
    filters.stats.atk.min = getNumber('atkMin');
    filters.stats.atk.max = getNumber('atkMax');
    filters.stats.def.min = getNumber('defMin');
    filters.stats.def.max = getNumber('defMax');
    filters.stats.spa.min = getNumber('spaMin');
    filters.stats.spa.max = getNumber('spaMax');
    filters.stats.spd.min = getNumber('spdMin');
    filters.stats.spd.max = getNumber('spdMax');
    filters.stats.spe.min = getNumber('speMin');
    filters.stats.spe.max = getNumber('speMax');
    

    applyFilters();
  });

  // Limit type selection to maximum of 2
  document.getElementById('typeFilter').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const allCheckboxes = document.querySelectorAll('#typeFilter input[type="checkbox"]');
      const checkedBoxes = document.querySelectorAll('#typeFilter input[type="checkbox"]:checked');
      
      if (checkedBoxes.length >= 2) {
        // Disable unchecked checkboxes when 2 are selected
        allCheckboxes.forEach(checkbox => {
          if (!checkbox.checked) {
            checkbox.disabled = true;
            checkbox.parentElement.style.opacity = '0.4';
          }
        });
      } else {
        // Re-enable all checkboxes when fewer than 2 are selected
        allCheckboxes.forEach(checkbox => {
          checkbox.disabled = false;
          checkbox.parentElement.style.opacity = '1';
        });
      }
    }
  });

});

function getNumber(id){
  const val = document.getElementById(id).value;
  return val === '' ? null : Number(val);
}

function getGenMax(gen){
  switch(gen){
    case 9:
      return 1025;
    case 8: 
      return 905;
    case 7:
      return 809;
    case 6:
      return 721;
    case 5:
      return 649;
    case 4:
      return 493;
    case 3:
      return 386;
    case 2:
      return 251;
    case 1:
      return 151;
    default:
      return 1025;
  }
}

// filter state object
const filters = {
  generation: 9,
  types: [],
  stats: {
    hp: { min: null, max: null },
    atk: { min: null, max: null },
    def: { min: null, max: null },
    spa: { min: null, max: null },
    spd: { min: null, max: null },
    spe: { min: null, max: null }
  }
};







