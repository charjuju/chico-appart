import React, { useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import customIcon from './icone.svg'
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
    <div style={{ margin: '30px', height: '85vh', display: 'flex', justifyContent: 'space-around', paddingTop: '50px', flexWrap: 'wrap' }}>
      <div style={{height: '40vh', overflow: 'hidden'}}>
        <MapContainer
          center={[44.8378, -0.5792]}
          zoom={13}
          style={{ height: '40vh', minWidth: '300px', width: '40vw', borderRadius: '38px' }}
          ref={mapRef}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {/* Ajouter les marqueurs ici */}
          {pointsData &&
            pointsData.map((point, index) => (
              <div data-cy='marker' key={index}>
                {point.position[0] !== null && point.position[1] !== null &&
                  <Marker
                    key={index} position={[point.position[0], point.position[1]]} icon={L.icon({ iconUrl: point.ico, iconSize: [40, 40] })} eventHandlers={{
                      click: () => clickSurIco(index)
                    }}
                  >
                    <Popup><strong>{point.name}</strong><br />{point.description}</Popup>
                  </Marker>}
              </div>
            ))}
        </MapContainer>
      </div>
      <div style={{ minWidth: '300px', width: '40vw'}}>
        {pointSelectioner !== null ?
          <div >
            <h1>{pointsData[pointSelectioner].name}</h1>
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
