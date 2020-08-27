import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const API_ID = "ed56c293";
  const API_KEY = "8f9a4fa43510d224d8112d2d7b529c0e";
  const [recipes, setRecipes] = useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('chicken')
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
  const updateSearch=(e)=>{
      setSearch(e.target.value)
  }
  const getSearch=(e)=>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  return (
    <div className="App">
      <h1 className="heading">Recipe App</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
