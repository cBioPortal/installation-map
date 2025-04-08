
import React, { useState } from 'react';
import { Instance } from "@/types/instance";
import { useInstanceFilter } from '@/hooks/useInstallationFilter';
import SearchBar from './location-list/SearchBar';
import InstallationStats from './location-list/InstallationStats';
import InstallationList from './location-list/InstallationList';

interface LocationsListProps {
  installations: Instance[];
  totalInstallations: number;
  uniqueCountriesCount: number;
  uniqueOrganizationsCount: number;
  selectedInstallation: Instance | null;
  hoveredInstallation: Instance | null;
  onSelect: (installation: Instance) => void;
  onHover: (installation: Instance | null) => void;
}

const LocationsList = ({
  installations,
  totalInstallations,
  uniqueCountriesCount,
  uniqueOrganizationsCount,
  selectedInstallation,
  hoveredInstallation,
  onSelect,
  onHover
}: LocationsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredInstances: filteredInstallations } = useInstanceFilter(installations, searchTerm);

  return (
    <div className="p-4 bg-white rounded-lg rounded-tl-none rounded-bl-none shadow-soft h-full overflow-hidden flex flex-col">
      <h3 className="font-semibold text-lg mb-4 text-cbioportal-darkBlue">cBioPortal Instances</h3>
      
      <InstallationStats 
        uniqueCountriesCount={uniqueCountriesCount}
        uniqueOrganizationsCount={uniqueOrganizationsCount}
        totalInstallations={totalInstallations}
      />
      
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="border-t border-gray-200 pt-2 mb-3 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-medium">{filteredInstallations.length}</span> instance{filteredInstallations.length !== 1 ? 's' : ''}
          {searchTerm && (
            <span className="ml-1 text-xs text-gray-400">
              (filtered from {totalInstallations})
            </span>
          )}
        </p>
      </div>
      
      <InstallationList 
        filteredInstallations={filteredInstallations}
        selectedInstallation={selectedInstallation}
        hoveredInstallation={hoveredInstallation}
        onSelect={onSelect}
        onHover={onHover}
      />
    </div>
  );
};

export default LocationsList;
