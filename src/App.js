import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Map from './Map'
import './App.css';
import { getDossiers} from './services'
import ThinderCard from "./ThinderCard";

/* VARIABLE A SUPPRE */


/* VARIABLE A SUPPRE */

function NavBar() {
  const navigate = useNavigate()

  return (
    <div className="conteneur-navbar" >
      <p onClick={() => navigate('/')}>Trouve ton appartement coup de coeur</p>
      <p onClick={() => navigate('/Map')}>Explore notre map de Bordeaux</p>
      <p onClick={() => navigate('/')}>Galerie</p>
    </div>
  )
}

function App() {
  //  const [appartementData, setAppartementData] = useState(null);
  const [justAppartementFile, setJustAppartementFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/contenu_du_dossier.json');
        const data = await response.json();


        //        setAppartementData(data.contenu);
        setJustAppartementFile(getDossiers(data.contenu))
        console.log(getDossiers(data.contenu))
      } catch (error) {
        console.error('Erreur lors de la récupération des données JSON :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
            <NavBar />
          </div>
          <div style={{height: '100vh', overflow: 'scroll'}}>
            <Routes>
              <Route path="/" element={<ThinderCard justAppartementFile={justAppartementFile} />} />
              <Route path="/Map" element={<Map pointsData={justAppartementFile} handleMarkerClick={console.log} />} />
            </Routes>
          </div>
          <footer>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              © Marzat - all Rights reserved
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
