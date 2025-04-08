
import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import {Vector as VectorSource, XYZ} from 'ol/source';
import { defaults as defaultControls } from 'ol/control';
import { Instance } from "@/types/instance";
import { createMarkerFeatures, updateMarkerStyles } from '@/utils/mapUtils';
import { Style } from 'ol/style';
import { Icon } from 'ol/style';

interface UseMapInitializationProps {
  installations: Instance[];
  onSelectInstallation: (installation: Instance | null) => void;
  onHoverInstallation: (installation: Instance | null) => void;
  selectedInstallation: Instance | null;
  hoveredInstallation: Instance | null;
  setVisibleInstallations: (installations: Instance[]) => void;
}

export const useMapInitialization = ({
  installations,
  onSelectInstallation,
  onHoverInstallation,
  selectedInstallation,
  hoveredInstallation,
  setVisibleInstallations
}: UseMapInitializationProps) => {
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (selectedInstallation || hoveredInstallation) {
      updateMarkerStyles(
        vectorLayerRef.current, 
        selectedInstallation?.id || null, 
        hoveredInstallation?.id || null
      );
    } else {
      updateMarkerStyles(vectorLayerRef.current, null, null);
    }
  }, [selectedInstallation, hoveredInstallation]);

  const initializeMap = (mapRef: HTMLDivElement) => {
    if (!mapRef) return;

    const features = createMarkerFeatures(installations);
    const vectorSource = new VectorSource({ features });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const installation = feature.get('installation') as Instance;
        const isSelected = selectedInstallation?.id === installation.id;
        const isHovered = hoveredInstallation?.id === installation.id;
        return createMarkerStyle(isSelected, isHovered);
      }
    });
    
    vectorLayerRef.current = vectorLayer;

    const map = new Map({
      target: mapRef,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 0,
        extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
      }),
      controls: defaultControls({
        zoom: false,
        rotate: false,
        attribution: true,
      }),
    });

    const updateVisibleInstallations = () => {
      if (!map) return;
      
      const extent = map.getView().calculateExtent(map.getSize());
      const visibleFeatures = vectorSource.getFeaturesInExtent(extent);
      
      const visible = visibleFeatures.map(feature => feature.get('installation'));
      setVisibleInstallations(visible);
    };

    map.on('click', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
      
      if (feature) {
        const installation = feature.get('installation');
        onSelectInstallation(installation);
      } else {
        onSelectInstallation(null);
      }
    });

    map.on('pointermove', (evt) => {
      const pixel = map.getEventPixel(evt.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      
      map.getViewport().style.cursor = hit ? 'pointer' : 'default';
      
      const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
      
      if (feature) {
        const installation = feature.get('installation');
        onHoverInstallation(installation);
      } else {
        onHoverInstallation(null);
      }
    });

    map.on('moveend', updateVisibleInstallations);
    updateVisibleInstallations();

    mapInstanceRef.current = map;
  };

  return {
    mapInstanceRef,
    vectorLayerRef,
    initializeMap
  };
};

const createMarkerStyle = (isSelected: boolean, isHovered: boolean = false) => {
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
