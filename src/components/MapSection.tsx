
import GlobeMap from "@/components/GlobeMap";
import { Instance } from "@/types/instance";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";

interface MapSectionProps {
  installations: Instance[];
  small?: boolean
}

const MapSection = ({ installations, small }: MapSectionProps) => {
  return (
    <div id="map" className={`${small ? '' : 'rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white'}`}>
        <AspectRatio ratio={16 / 9} className="bg-muted">
            <div className="h-full relative">
                <GlobeMap small={small} installations={installations}/>
            </div>
        </AspectRatio>
    </div>
  );
};

export default MapSection;
