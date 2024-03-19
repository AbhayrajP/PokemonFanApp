import React, {useState} from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Pokemon from './components/Pokemon';
import About from './components/About';
import Home from './components/Home';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [mode,setMode] = useState('light');
  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      // showAlert("Dark mode has been enabled", "success");
      // document.body.style.backgroundImage = `url('${text_utils_bg_dark}')`;
    }else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      // showAlert("Light mode has been enabled", "success");
      // document.body.style.backgroundImage = `url('${text_utils_bg_light}')`;
    }
  }


  return (
    <div className="App">
      <Navbar title="PokeFan" aboutText="About" mode={mode} toggleModeClick={toggleMode}></Navbar>
      <Routes>
        <Route path="/PokemonFanApp/" element={ 
           <div className="container my-3">
      
           <Pokemon mode={mode}/>
         </div>
        } />
        <Route path="/PokemonFanApp/PokemonDetail" element={ <PokemonDetail/> } />
        <Route path="/PokemonFanApp/Home" element={ <Home/> } />
        <Route path="/PokemonFanApp/about" element={ <About/> } />
      </Routes>
    </div>
  );
}

export default App;
