
import { useState, useEffect } from 'react';
import { Instance } from "@/types/instance";

export function useInstanceFilter(
  instances: Instance[],
  searchTerm: string
) {
  const [filteredInstances, setFilteredInstances] = useState<Instance[]>(instances);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredInstances(instances);
    } else {
      const allInstances = window.allInstances || instances;
      
      const filtered = allInstances.filter(instance => 
        instance.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instance.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instance.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInstances(filtered);
    }
  }, [searchTerm, instances]);

  return { filteredInstances };
}
