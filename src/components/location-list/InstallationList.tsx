
import React, { useRef, useEffect, useState } from 'react';
import { Instance } from "@/types/instance";
import { ChevronDown, Search } from "lucide-react";
import InstallationItem from './InstallationItem';

interface InstallationListProps {
  filteredInstallations: Instance[];
  selectedInstallation: Instance | null;
  hoveredInstallation: Instance | null;
  onSelect: (installation: Instance) => void;
  onHover: (installation: Instance | null) => void;
}

const InstallationList = ({
  filteredInstallations,
  selectedInstallation,
  hoveredInstallation,
  onSelect,
  onHover
}: InstallationListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const listItemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [hasMoreContent, setHasMoreContent] = useState(false);

  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      setHasMoreContent(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    checkScrollable();
    
    window.addEventListener('resize', checkScrollable);
    
    return () => window.removeEventListener('resize', checkScrollable);
  }, [filteredInstallations]);

  useEffect(() => {
    if (selectedInstallation && listItemRefs.current[selectedInstallation.id]) {
      const listItem = listItemRefs.current[selectedInstallation.id];
      if (listItem && scrollContainerRef.current) {
        listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedInstallation]);

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 200,
        behavior: 'smooth'
      });
    }
  };

  if (filteredInstallations.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-blue-50 inline-flex p-4 rounded-full mb-3">
          <Search className="h-6 w-6 text-cbioportal-blue" />
        </div>
        <p className="text-gray-500">No matching instances found</p>
        <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow relative">
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 overflow-y-auto scrollbar-hide"
        >
          <ul className="space-y-2.5 pr-2">
            {filteredInstallations.map(installation => (
              <InstallationItem 
                key={installation.id}
                ref={el => listItemRefs.current[installation.id] = el}
                installation={installation}
                isSelected={selectedInstallation?.id === installation.id}
                isHovered={hoveredInstallation?.id === installation.id}
                onSelect={onSelect}
                onHover={onHover}
              />
            ))}
          </ul>
        </div>
      </div>
      
      {hasMoreContent && (
        <div className="relative mt-2 flex justify-center">
          <button 
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                  top: 200,
                  behavior: 'smooth'
                });
              }
            }}
            className="flex items-center justify-center p-1 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 transition-all"
            aria-label="Scroll down for more"
          >
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      )}
    </>
  );
};

export default InstallationList;
