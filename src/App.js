import { motion, useMotionValue, useTransform } from "framer-motion"
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Map from './Map'
import './App.css';
import { getDossiers , getImageOfAppartement} from './services'

/* VARIABLE A SUPPRE */

const pointMap = [{
  "name": "76 Rue leberthon",
  "address": "123 rue des dog",
  "description": "",
  "position": [44.82778249571717, -0.5755731760083583],
  "ico": 'apartment-ico.svg'
}]

/* VARIABLE A SUPPRE */


function ThinderCard({ justAppartementFile }) {
  const [velocityCard, setVelocityCard] = useState(null)
  const [cardListIndex, setCardListIndex] = useState(0)
  const [imgIndexCard, setImgIndexCard] = useState(0)

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  //  const color = useTransform(x, xInput, [
  //    "rgb(211, 9, 225)",
  //    "rgb(68, 0, 255)",
  //    "rgb(3, 209, 0)"
  //  ]);
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg,  #0f6ed6 0%, rgb(255, 255, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"
  ]);

  function likeLappartement() {
    setCardListIndex(cardListIndex + 1)

  }

  function unLikeLappartement() {
    setCardListIndex(cardListIndex + 1)
  }

  useEffect(() => {
    if (velocityCard) {
      console.log(velocityCard.offset.x)
      if (velocityCard.offset.x <= -200) {
        setCardListIndex(cardListIndex + 1)
      } else if (velocityCard.offset.x >= 200) {
        setCardListIndex(cardListIndex + 1)
      }
      setVelocityCard(null)
      setImgIndexCard(0)
    }

  }, [velocityCard, cardListIndex])



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'red' }}>
      <div style={{ width: '100%' }}>
        <motion.div transition={{ type: "spring" }} style={{ background, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div className="box"
            style={{ x, backgroundColor: "white" }}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            drag
            onDragEnd={(e, i) => setVelocityCard(i)}
          >
            {justAppartementFile !== null && justAppartementFile.length > cardListIndex ?
              <div style={{ display: "flex", flexDirection: 'column', height: '100%' }}>
                <div
                onClick={() => setImgIndexCard(imgIndexCard + 1)}
                style={{
                  height: '100%', backgroundColor: 'gray', margin: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column-reverse', padding: '10px',
                  backgroundImage: `url('${getImageOfAppartement(justAppartementFile, cardListIndex, imgIndexCard)}')`, // Remplacez par le chemin de votre image
                  backgroundSize: 'cover', // Ajustez selon vos besoins
                  backgroundPosition: 'center', // Ajustez selon vos besoins
                }}>
                  <h1 style={{color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>{justAppartementFile[cardListIndex].nom}</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
                  <img onClick={() => likeLappartement()} style={{ height: '52px' }} src="noo.svg" alt="Like"></img>
                  <img onClick={() => console.log("miaw")} style={{ height: '52px' }} src="info.png" alt="info"></img>
                  <img onClick={() => unLikeLappartement()} style={{ height: '52px' }} src="like.svg" alt="Like"></img>
                </div>
              </div> : <div><p>vous avez vue tout les appartement</p></div>}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

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
          <div className="container">
            <Routes>
              <Route path="/" element={<ThinderCard justAppartementFile={justAppartementFile} />} />
              <Route path="/Map" element={<Map pointsData={pointMap} handleMarkerClick={console.log} />} />
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
