
import React from 'react';
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from 'lucide-react';
import Map from 'ol/Map';
import { handleZoom } from '@/utils/mapUtils';

interface MapControlsProps {
  map: Map | null;
}

const MapControls = ({ map }: MapControlsProps) => {
  const handleZoomIn = () => {
    handleZoom(map, true);
  };

  const handleZoomOut = () => {
    handleZoom(map, false);
  };

  return (
    <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleZoomIn}
        className="bg-white/80 hover:bg-white/90 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <ZoomIn className="h-5 w-5 text-gray-700" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleZoomOut}
        className="bg-white/80 hover:bg-white/90 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <ZoomOut className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  );
};

export default MapControls;
