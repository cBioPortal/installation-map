
import { useState, useEffect } from 'react';
import { Instance } from "@/types/instance";

export function useInstanceState(instances: Instance[]) {
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null);
  const [hoveredInstance, setHoveredInstance] = useState<Instance | null>(null);
  const [visibleInstances, setVisibleInstances] = useState<Instance[]>(instances);

  // Make all instances accessible globally for the search functionality
  useEffect(() => {
    window.allInstances = instances;
  }, [instances]);

  const handleSelectInstance = (instance: Instance | null) => {
    setSelectedInstance(instance);
  };

  const handleHoverInstance = (instance: Instance | null) => {
    setHoveredInstance(instance);
  };

  return {
    selectedInstance,
    hoveredInstance,
    visibleInstances,
    setVisibleInstances,
    handleSelectInstance,
    handleHoverInstance
  };
}
