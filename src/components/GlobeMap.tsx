
import React from 'react';
import { Instance } from "@/types/instance";
import MapContainer from './map/MapContainer';
import DetailPanel from './map/DetailPanel';
import InstallationPopup from './map/InstallationPopup';
import { useInstanceState } from '@/hooks/useInstallationState';
import 'ol/ol.css';

interface GlobeMapProps {
  installations: Instance[];
  small?: boolean;
}

const GlobeMap = ({ installations, small }: GlobeMapProps) => {
  const {
    selectedInstance: selectedInstallation,
    hoveredInstance: hoveredInstallation,
    visibleInstances: visibleInstallations,
    setVisibleInstances: setVisibleInstallations,
    handleSelectInstance: handleSelectInstallation,
    handleHoverInstance: handleHoverInstallation
  } = useInstanceState(installations);

  return (
    <div className="relative w-full h-full flex">
      <MapContainer 
        installations={installations}
        selectedInstallation={selectedInstallation}
        hoveredInstallation={hoveredInstallation}
        onSelectInstallation={handleSelectInstallation}
        onHoverInstallation={handleHoverInstallation}
        setVisibleInstallations={setVisibleInstallations}
        small={small}
      />

        {!small &&
      <DetailPanel 
        installations={installations}
        visibleInstallations={visibleInstallations}
        selectedInstallation={selectedInstallation}
        hoveredInstallation={hoveredInstallation}
        onSelectInstallation={handleSelectInstallation}
        onHoverInstallation={handleHoverInstallation}
      />}

        {!small &&
      <InstallationPopup 
        installation={selectedInstallation} 
        onClose={() => handleSelectInstallation(null)} 
      />}
    </div>
  );
};

export default GlobeMap;
