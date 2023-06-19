import { useEffect, useState } from 'react';
import { imgLink } from '../Config';
import './Body.css';
import Loader from '../Loader/Loader';

export const Body = () => {
  
  const [loading, setLoading] = useState(true);
  const [pokedata, setPokedata] = useState([]);
  const [prevdata, setPrevdata] = useState([]);
  const [nextdata, setNextdata] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);


  



  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata(url = 'https://pokeapi.co/api/v2/pokemon/') {
    try {
      setLoading(true);
      const data = await fetch(url);
      const json = await data.json();
      setPokedata(json.results);
      setNextdata(json.next);
      setPrevdata(json.previous);
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const handlePrevClick = () => {
    if (prevdata) {
      fetchdata(prevdata);
    }
  };

  const handleNextClick = () => {
    if (nextdata) {
      fetchdata(nextdata);
    }
  };



  return loading ? (
    <Loader />
  ) : (
    <>


      <div className="downbuttons">
        <button className='btndes' onClick={handlePrevClick}>Prev</button>
        <button className='btndes' onClick={handleNextClick}>Next</button>
      </div>




      <div className="Body">
        {pokedata.map((poke) => {
          return <PokemonDetatil key={poke.name} {...poke} />;
        })}
      </div>

      <div className="downbuttons">
        <button className='btndes' onClick={handlePrevClick}>Prev</button>
        <button className='btndes' onClick={handleNextClick}>Next</button>
      </div>

      {/* Conditionally render PokemonDetatil component */}
      {pokemonData && <PokemonDetatil {...pokemonData} />}
    </>
  );
};

export const PokemonDetatil = (props) => {
  if(props === NaN){
       return (
        <>
            <h3>not found</h3>
        </>
       )
  }
    const [fullData,setFulldata] = useState([]);
  
  const urlNumber =  props.url.split('/').filter((part) => !!part).pop() ;
  const imageUrl = `${imgLink}${urlNumber}.svg`;
  const capitalizedFirstLetter = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  
  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon/" + urlNumber ;
      const data = await fetch(url);
      const json = await data.json();
      
      console.log(json.base_experience);
      const obj = {
        ablity1 : json.abilities[0]['ability']['name'],
        ablity2 : json.abilities[1]['ability']['name'],
        move1 : json.moves[0]['move']['name'],
        move2 : json.moves[1]['move']['name'],
        move3 : json.moves[2]['move']['name'],
        move4 : json.moves[3]['move']['name'],
        move5 : json.moves[4]['move']['name'],
        move6 : json.moves[5]['move']['name'],
        move7 : json.moves[6]['move']['name'],
        move8 : json.moves[7]['move']['name'],
        base_experience : json.base_experience,
        height: json.height,
        weight: json.weight,

      }
      setFulldata(obj);
      
    } catch (error) {
      console.log('Error:', error);
    }
  }


 

  
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    if(showPopup===true){
      setShowPopup(false);
    }
    else{
    setShowPopup(true);
    }
    console.log(showPopup);     
  };
 

  

  return (
    <>
      <div className="bodyContainer" onClick={handleOpenPopup}>
        <p className="pokename">{capitalizedFirstLetter}🔖</p>
        
        <img className="pokeimg" src={imageUrl} alt="not found" />
       

{showPopup ? (
  <div className="main">
    <div className="popup">
      <div className="popup-header">
        <p className="poptext">{capitalizedFirstLetter} </p> 
        <img className="pokemonimg" src={imageUrl} alt="not found" />
        <h1 onClick={handleOpenPopup}>X</h1>
      </div>
      <div>
      <p>Height: {fullData.height} m</p>
      <p>weight: {fullData.weight} Kg</p>
        <p>Abilities: {fullData.ablity1}, {fullData.ablity2}</p>
        <p>Moves: {fullData.move1}, {fullData.move2}, {fullData.move3}, {fullData.move4}, {fullData.move5}</p>
        <p>Base experience: {fullData.base_experience}</p>
        
        
      </div>
    </div>
  </div>
): ""}
</div>
    </>
  );
};
