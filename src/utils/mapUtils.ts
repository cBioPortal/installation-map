import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import View from 'ol/View';
import { Instance } from '@/types/instance';

export const createMarkerFeatures = (installations: Instance[]): Feature[] => {
  return installations.map(installation => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([installation.lng, installation.lat])),
      installation
    });
    
    return feature;
  });
};

export const createMarkerStyle = (isSelected: boolean, isHovered: boolean = false) => {
  return new Style({
    image: new Icon({
      anchor: [0.5, 0.5],
      scale: isSelected ? 1.2 : isHovered ? 1.0 : 0.8,
      src: isSelected 
        ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23E0502D" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
        : isHovered
          ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%235DA0D5" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
          : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%233786C2" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
    })
  });
};

export const updateMarkerStyles = (
  vectorLayer: VectorLayer<VectorSource> | null, 
  selectedId: string | null,
  hoveredId: string | null
) => {
  if (!vectorLayer) return;
  
  const features = vectorLayer.getSource()?.getFeatures() || [];
  
  features.forEach(feature => {
    const installation = feature.get('installation') as Instance;
    const isSelected = installation.id === selectedId;
    const isHovered = installation.id === hoveredId;
    
    feature.setStyle(createMarkerStyle(isSelected, isHovered));
  });
};

export const centerMapOnInstallation = (map: Map | null, installation: Instance) => {
  if (!map) return;
  
  const view = map.getView();
  
  view.animate({
    center: fromLonLat([installation.lng, installation.lat]),
    duration: 1000,
    zoom: Math.max(view.getZoom() || 2, 4)
  });
};

export const handleZoom = (map: Map | null, zoomIn: boolean) => {
  if (!map) return;
  
  const view = map.getView();
  const zoom = view.getZoom() + (zoomIn ? 1: -1)
  view.setZoom(zoom);
};