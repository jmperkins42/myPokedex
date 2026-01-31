# 🧢 MyPokedex

**MyPokedex** is a modern, front-end web application that consumes the **PokeAPI** and presents Pokémon data in an interactive, searchable, and sortable table.

This project was built to practice **modern JavaScript**, **API consumption**, and **data-driven UI design**, using industry-standard tooling and patterns.

---

## 🚀 Live Features

- 📊 Interactive DataTable with sorting, searching, and pagination  
- 🌐 Live data fetched from the [PokeAPI](https://pokeapi.co/)  
- 🧬 Displays Pokémon types, abilities, and detailed base stats  
- ⚡ Fast development workflow powered by **Vite**  
- 🎨 Responsive UI using **Bootstrap 5**  
- 🧠 Clean separation between data fetching and presentation logic  

---

## 🛠 Tech Stack

- **Vite** — modern dev server and build tool  
- **JavaScript (ES Modules)** — clean, modular code structure  
- **jQuery + DataTables** — robust table functionality  
- **Bootstrap 5** — responsive layout and styling  
- **PokeAPI** — public REST API for Pokémon data  

---

## 📦 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run the development server
```bash
npm run dev
```

### 3️⃣ Open in browser
```bash
http://localhost:5173
```

---

## 🧠 Application Architecture

At a high level, the application works as follows:

1. Pokémon references are fetched from the PokeAPI using its paginated list endpoint

2. Individual Pokémon detail endpoints are requested as needed

3. Relevant fields are normalized into a consistent data structure

4. Rows are dynamically inserted into a DataTable instance

5. DataTables handles UI concerns such as sorting, searching, and pagination

This approach keeps data logic separate from UI logic, making the application easier to scale and refactor.

---

## 📊 Data Displayed
| Column | Description |
|------|-----------|
| #	| Pokédex ID |
| Name | Pokémon name |
| Type | Primary and secondary types |
|Abilities | Pokémon abilities |
| HP | Base HP stat |
| ATK | Base Attack stat |
|DEF | Base Defense stat |
|SpA | Base Special Attack stat |
|SpD | Base Special Defense stat |
|Spe | Base Speed stat |

Base stats are implemented as real columns (not embedded text), allowing for proper sorting and filtering.

---

## 🎯 Project Goals

- Practice working with external REST APIs

- Apply modern JavaScript (ES6+) patterns

- Learn proper data modeling for UI components

- Build a clean, extensible front-end project suitable for a portfolio

---

## 🔮 Possible Enhancements

- Generation and region filtering

- Stat-based column filters (e.g., HP > 100)

- Type badges with color coding

- Lazy loading or batched API requests

- Pokémon detail modal view

---

## 📜 Disclaimer

Pokémon and Pokémon character names are trademarks of Nintendo.
This project is for educational and portfolio purposes only.