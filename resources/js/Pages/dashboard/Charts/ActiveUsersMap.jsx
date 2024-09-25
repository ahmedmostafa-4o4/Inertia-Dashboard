import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's missing icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const userLocations = [
  { id: 1, name: "User 1", position: [51.505, -0.09] }, // London
  { id: 2, name: "User 2", position: [48.8566, 2.3522] }, // Paris
  { id: 3, name: "User 3", position: [40.7128, -74.006] }, // New York
];

// Custom hook to disable scroll on map in mobile devices
const DisableScrollOnMobile = () => {
  const map = useMap();

  useEffect(() => {
    // Function to detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Disable zoom and drag interactions on mobile devices
      map.scrollWheelZoom.disable();
      map.dragging.disable();
    } else {
      // For desktop, allow dragging but disable scroll zoom by default
      map.scrollWheelZoom.disable();
    }

    // Enable dragging when interacting directly with the map on mobile
    const enableDraggingOnTouch = () => map.dragging.enable();

    // Add touchstart listener to enable dragging when touching the map
    map.getContainer().addEventListener("touchstart", enableDraggingOnTouch);

    // Cleanup event listener when the component is unmounted
    return () => {
      map
        .getContainer()
        .removeEventListener("touchstart", enableDraggingOnTouch);
    };
  }, [map]);

  return null;
};

const ActiveUsersMap = () => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
      touchZoom="center"
      scrollWheelZoom={false}
    >
      {/* Disable scrolling on mobile */}
      <DisableScrollOnMobile />

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {userLocations.map((user) => (
        <Marker key={user.id} position={user.position}>
          <Popup>
            <b>{user.name}</b>
            <br />
            Active now.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ActiveUsersMap;
