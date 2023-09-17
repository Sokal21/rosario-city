import { useContext, useState } from "react";
import { ResourceContext } from "providers/ResourceProvider";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import { LatLng } from "leaflet";
import { geoData } from "./data";
import { invertMapPolyon } from "utils/invertMapPolyon";

const Test: React.FC = () => {
  const [location, setLocation] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });

  return location ? <Marker position={location} /> : null;
};

invertMapPolyon(geoData);

function App() {
  const { bullets, power, dope, money } = useContext(ResourceContext);

  return (
    <div>
      <div>
        <ul className="flex gap-6">
          <li>Fierros: {bullets.current.current} 🔫</li>
          <li>Poder: {power.current.current} 👊🏽</li>
          <li>Falopa: {dope.current.current} ❄️</li>
          <li>La viva: {money.current.current} 💸</li>
        </ul>
      </div>

      <MapContainer
        center={[-32.94625, -60.665339]}
        style={{
          width: "100%",
          height: 600,
        }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Test />
        <GeoJSON data={geoData as any} />
      </MapContainer>
    </div>
  );
}

export default App;
