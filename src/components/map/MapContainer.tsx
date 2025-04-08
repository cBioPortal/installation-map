
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
  small?: boolean
}

const MapContainer = ({
  installations,
  selectedInstallation,
  hoveredInstallation,
  onSelectInstallation,
  onHoverInstallation,
  setVisibleInstallations,
    small
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

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current
    const handleResize = () => {
      const view = map.getView();
      view.setZoom(1)
      view.setCenter([0,0])
      map.updateSize()
    }
    window.addEventListener('resize', handleResize)
  }, []);

  return (
    <div className={`${small ? 'w-full' : 'w-[70%]'} h-full relative`}>
      <div ref={mapRef} className="absolute inset-0" />
      {!small &&
      <MapControls map={mapInstanceRef.current} />}
    </div>
  );
};

export default MapContainer;
