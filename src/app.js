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
      name: pokemon.name,
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

  // need clarification on this one,
  // what is the point of setting allpokemon to detialed pokemon?
  // i thought the point of detailed pokemon was to carry the details of the pokemon
  // it seems like a waste of a variable
  // but im realizing that it might be because of scope
  allPokemon = detailedPokemon 

  // initial table creation
  refreshTable(allPokemon);

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

  document.getElementById('applyFilters').addEventListener('click', () => {
    // gets generation
    filters.generation = Number(document.getElementById('genFilter').value);

    // selected types
    filters.types = Array.from(
      document.getElementById('typeFilter').selectedOptions
    ).map(o => o.value);

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

});

function getNumber(id) {
  const val = document.getElementById(id).value;
  return val === '' ? null : Number(val);
}

function applyFilters() {
  const filtered = allPokemon.filter(p => {
    
    //entirety of filtering probably needs editing

    // generation should be filtered by #,
    // meaning when Gen IX is selected, all 1025 pokemon are visible,
    // but when VIII is selected, only 905 are visible, etc.,
    // all the way down to Gen I selected, only the orignal 151.
    
    /*
    //Generation
    if (filters.generation && p.generation !== filters.generation) {
      return false;
    }

    // the logic I want implemented here is when nothing is selected,
    // there will be all types, and then if one or two is selected,
    // the typing is filtered on one or both of those. ideally,
    // there can't be more than two selected

    // Types (AND logic)
    if (filters.types.length > 0) {
      const hasAllTypes = filters.types.every(t => p.types.includes(t));
      if (!hasAllTypes) return false;
    }

    // this appears to be correct

    // Stats
    for (const stat in filters.stats) {
      const { min, max } = filters.stats[stat];
      const value = p.stats[stat];

      if (min !== null && value < min) return false;
      if (max !== null && value > max) return false;
    }
    */
    return true;
  });

  refreshTable(filtered);
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







