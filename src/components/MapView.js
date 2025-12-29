import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ appeals, onSelect, selectedAppeal }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([51.1282, 71.4304], 12);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(mapInstance.current);
    }

    markersRef.current.forEach(marker => {
      if (mapInstance.current) {
        mapInstance.current.removeLayer(marker);
      }
    });
    
    markersRef.current = [];

    if (mapInstance.current) {
      appeals.forEach(appeal => {
        const markerColor = getMarkerColor(appeal.status);
        
        const icon = L.divIcon({
          html: `
            <div style="
              background: ${markerColor};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 2px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg style="width: 10px; height: 10px;" viewBox="0 0 24 24">
                <path fill="white" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
            </div>
          `,
          className: 'custom-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 20]
        });

        const marker = L.marker([appeal.latitude, appeal.longitude], { icon })
          .addTo(mapInstance.current)
          .bindPopup(`
            <div style="padding: 10px;">
              <div><strong>${appeal.category}</strong></div>
              <div>${appeal.address}</div>
              <div style="color: ${markerColor}; margin-top: 5px;">
                ${appeal.status}
              </div>
            </div>
          `);

        marker.on('click', () => onSelect(appeal));
        markersRef.current.push(marker);
      });

      if (selectedAppeal) {
        mapInstance.current.setView(
          [selectedAppeal.latitude, selectedAppeal.longitude],
          15
        );
      }
    }

    return () => {
      markersRef.current.forEach(marker => {
        if (mapInstance.current) {
          mapInstance.current.removeLayer(marker);
        }
      });
    };
  }, [appeals, selectedAppeal, onSelect]);

  const getMarkerColor = (status) => {
    if (status === 'В работе') return '#f39c12';
    if (status === 'Решено') return '#27ae60';
    if (status === 'Отклонено') return '#e74c3c';
    return '#3498db';
  };

  return (
    <div className="map-view">
      <div 
        ref={mapRef} 
        style={{ 
          height: '400px', 
          width: '100%', 
          borderRadius: '8px'
        }} 
      />

      <style jsx>{`
        .map-view {
          height: 100%;
        }
        
        @media (max-width: 768px) {
          .map-view {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}

export default MapView;