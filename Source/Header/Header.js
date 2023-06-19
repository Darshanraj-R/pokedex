import { useState } from 'react';
import './Header.css';
import { PokemonDetatil } from '../Body/Body';

const Header = () => {
  const [inputData, setInputData] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + inputData;
      const data = await fetch(url);
      const json = await data.json();
      console.log(json);

      if(json === undefined) {
      {<>not fond</>}
      }
      const props = {
        name: json.name,
        url: url+'/'+json.id+'/',
        allow: 1,
      };
      console.log(props)
      setPokemonData(props); // Store the result in state variable
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div id="headContainer">
      <div id="headerLeft">
        <h1 className="logo-pokemon">Pokédex</h1>
      </div>

      <div id="headerCenter">
        <input type="text" onChange={handleInputChange} />
        <input type="submit" className="df" onClick={handleSearch} />
      </div>

      <div id="headerRight">
        <div className="icons">
          <label>Home</label>
          <i className="fa fa-home"></i>
        </div>
        <div className="icons">
          <label>Bookmark</label>
          <i className="fa fa-cart-plus"></i>
        </div>
      </div>

      {/* Conditionally render PokemonDetatil component */}
      {pokemonData && <PokemonDetatil {...pokemonData} />}
    
    </div>
  );
};

export default Header;
