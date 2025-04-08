
import React from 'react';
import { Installation } from "@/types/installation";
import InstallationDetails from '../InstallationDetails';

interface InstallationPopupProps {
  installation: Installation | null;
  onClose: () => void;
}

const InstallationPopup = ({ installation, onClose }: InstallationPopupProps) => {
  if (!installation) return null;
  
  return (
    <div className="absolute bottom-4 left-4 w-80 max-w-xs">
      <InstallationDetails 
        installation={installation} 
        onClose={onClose} 
      />
    </div>
  );
};

export default InstallationPopup;
