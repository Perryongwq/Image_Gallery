import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {NavBar} from "./components/NavBar"; // Assuming NavBar is a default export
import { Gallery } from "./Gallery";
import  Slider  from "./components/Slider";



import "./styles.css";

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Slider/>
        
        <Gallery />
      </>
    </Router>
  );
}

export default App;