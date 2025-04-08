
import React from 'react';
import { Instance } from "@/types/instance";
import {MapPin} from "lucide-react";

interface InstallationItemProps {
  installation: Instance;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (installation: Instance) => void;
  onHover: (installation: Instance | null) => void;
  ref: React.Ref<HTMLLIElement>;
}

const InstallationItem = React.forwardRef<HTMLLIElement, Omit<InstallationItemProps, 'ref'>>(
  ({ installation, isSelected, isHovered, onSelect, onHover }, ref) => {
    return (
      <li 
        ref={ref}
        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-l-3 relative ${
          isSelected 
            ? 'bg-cbioportal-blue/10 border-l-cbioportal-blue shadow-sm' 
            : isHovered
              ? 'bg-gray-100 border-l-gray-300'
              : 'hover:bg-gray-50 hover:border-l-gray-300 border-l-transparent'
        }`}
        onClick={() => onSelect(installation)}
        onMouseEnter={() => onHover(installation)}
        onMouseLeave={() => onHover(null)}
      >
        <div className="font-medium text-gray-800">{installation.institution}</div>
        <div className="text-sm text-cbioportal-blue mt-1">{installation.group}</div>
        <div className="text-xs text-gray-500 mt-0.5 flex items-center">
          <MapPin className="h-3 w-3 mr-1 inline-block text-gray-400" />
          {installation.address}
        </div>
        {isSelected && (
          <div className="absolute right-2 top-2 h-2 w-2 bg-cbioportal-blue rounded-full" />
        )}
      </li>
    );
  }
);

InstallationItem.displayName = 'InstallationItem';

export default InstallationItem;

