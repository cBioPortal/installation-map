
import GlobeMap from "@/components/GlobeMap";
import { Instance } from "@/types/instance";

interface MapSectionProps {
  installations: Instance[];
}

const MapSection = ({ installations }: MapSectionProps) => {
  return (
    <div id="map" className="rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white">
      <div className="h-[70vh] relative">
        <GlobeMap installations={installations} />
      </div>
    </div>
  );
};

export default MapSection;
