
import React, { useRef, useEffect } from 'react';
import MapControls from './MapControls';
import { Installation } from "@/types/installation";
import { useMapInitialization } from '@/hooks/useMapInitialization';

interface MapContainerProps {
  installations: Installation[];
  selectedInstallation: Installation | null;
  hoveredInstallation: Installation | null;
  onSelectInstallation: (installation: Installation | null) => void;
  onHoverInstallation: (installation: Installation | null) => void;
  setVisibleInstallations: (installations: Installation[]) => void;
}

const MapContainer = ({
  installations,
  selectedInstallation,
  hoveredInstallation,
  onSelectInstallation,
  onHoverInstallation,
  setVisibleInstallations
}: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const { mapInstanceRef, initializeMap } = useMapInitialization({
    installations,
    onSelectInstallation,
    onHoverInstallation,
    selectedInstallation,
    hoveredInstallation,
    setVisibleInstallations
  });

  useEffect(() => {
    if (mapRef.current) {
      initializeMap(mapRef.current);
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
      }
    };
  }, [installations]);

  return (
    <div className="w-[70%] h-full relative">
      <div ref={mapRef} className="absolute inset-0" />
      <MapControls map={mapInstanceRef.current} />
    </div>
  );
};

export default MapContainer;
