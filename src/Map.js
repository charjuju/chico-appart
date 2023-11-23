import React, { useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const Map = ({ pointsData, handleMarkerClick }) => {
  const mapRef = useRef(null)
  const [pointSelectioner, setpointSelectioner] = useState(null)

  function clickSurIco(index) {
    handleMarkerClick(index)
    setpointSelectioner(index)
    console.log("vous avez cliquer sur:", index)
  }

  return (
    <div style={{ margin: '30px', height: '85vh', display: 'flex', justifyContent: 'space-around', paddingTop: '50px', flexWrap: 'wrap', borderBlockEndColor: 'green'}}>
      <div style={{ width: '40vw', minWidth: '375px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <MapContainer
          center={[44.8378, -0.5792]}
          zoom={13}
          style={{ height: '40vh', minWidth: '300px', width: '40vw', borderRadius: '38px' }}
          ref={mapRef}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {pointsData &&
            pointsData.map((point, index) => (
              <div data-cy='marker' key={index}>
                {point.position[0] !== null && point.position[1] !== null &&
                  <Marker
                    key={index} position={[point.position[0], point.position[1]]} icon={L.icon({ iconUrl: 'apartment-ico.svg', iconSize: [40, 40] })} eventHandlers={{
                      click: () => clickSurIco(index)
                    }}
                  >
                    <Popup><strong>{point.nom}</strong><br />{point.description}</Popup>
                  </Marker>}
              </div>
            ))}
        </MapContainer>
        <div style={{ minWidth: '300px', width: '40vw', height: '50vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{ width: '100%', height: '90%', backgroundColor: 'gray', borderRadius: '10px' }}>
            <h1>LES VIDEO DE DEHORE ET DE L APPARTEMENT</h1>
          </div>
        </div>
      </div>
      <div style={{ minWidth: '300px', width: '40vw', height: '100%', overflow: 'hidden' }}>
        {pointSelectioner !== null ?
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', maxHeight: '80vh' }}>
            <h1 style={{ margin: '10px', color: 'black' }}>{pointsData[pointSelectioner].nom}</h1>
            <h2 style={{ marginTop: '10px', color: 'black' }}>Image de l'appartement</h2>
            {pointsData[pointSelectioner].contenu.map((img, index) => (
              <div key={index}>
                <img alt='appartement' style={{ width: '100%' }} src={'appartement/' + pointsData[pointSelectioner].nom + '/' + img.nom}></img>
              </div>
            ))}
          </div>
          :
          <div>

          </div>
        }
      </div>
    </div>
  )
}

export default Map
