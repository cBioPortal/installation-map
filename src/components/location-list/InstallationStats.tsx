
import React from 'react';
import { Globe, Users, Building } from "lucide-react";

interface InstallationStatsProps {
  uniqueCountriesCount: number;
  uniqueOrganizationsCount: number;
  totalInstallations: number;
}

const InstallationStats = ({ 
  uniqueCountriesCount, 
  uniqueOrganizationsCount, 
  totalInstallations 
}: InstallationStatsProps) => {
  return (
    <div className="flex justify-between mb-5 text-sm bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
      <div className="flex items-center">
        <Globe className="mr-2 h-5 w-5 text-cbioportal-blue" />
        <div>
          <p className="text-xs text-gray-500 font-medium">Countries</p>
          <p className="font-bold text-cbioportal-darkBlue">{uniqueCountriesCount}</p>
        </div>
      </div>
      
      <div className="flex items-center">
          <Building className="mr-2 h-5 w-5 text-cbioportal-blue" />
        <div>
          <p className="text-xs text-gray-500 font-medium">Organizations</p>
          <p className="font-bold text-cbioportal-darkBlue">{uniqueOrganizationsCount}</p>
        </div>
      </div>
      
      <div className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-cbioportal-blue" />
        <div>
          <p className="text-xs text-gray-500 font-medium">Installations</p>
          <p className="font-bold text-cbioportal-darkBlue">{totalInstallations}</p>
        </div>
      </div>
    </div>
  );
};

export default InstallationStats;
