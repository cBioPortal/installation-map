
import React from 'react';
import { Instance } from "@/types/instance";
import LocationsList from '../LocationsList';
import { getUniqueCountriesCount, getUniqueOrganizationsCount } from '@/utils/installationUtils';

interface DetailPanelProps {
  installations: Instance[];
  visibleInstallations: Instance[];
  selectedInstallation: Instance | null;
  hoveredInstallation: Instance | null;
  onSelectInstallation: (installation: Instance) => void;
  onHoverInstallation: (installation: Instance | null) => void;
}

const DetailPanel = ({
  installations,
  visibleInstallations,
  selectedInstallation,
  hoveredInstallation,
  onSelectInstallation,
  onHoverInstallation
}: DetailPanelProps) => {
  return (
    <div className="w-[30%] h-full overflow-auto bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-inner">
      <LocationsList 
        installations={visibleInstallations} 
        totalInstallations={installations.length}
        uniqueCountriesCount={2}
        uniqueOrganizationsCount={2}
        selectedInstallation={selectedInstallation}
        hoveredInstallation={hoveredInstallation}
        onSelect={onSelectInstallation}
        onHover={onHoverInstallation}
      />
    </div>
  );
};

export default DetailPanel;
