
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instance } from "@/types/instance";

interface InstallationDetailsProps {
  installation: Instance;
  onClose: () => void;
}

const InstallationDetails = ({ installation, onClose }: InstallationDetailsProps) => {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{installation.name}</h3>
            <p className="text-gray-600">{installation.organization}</p>
            <p className="text-sm text-gray-500 mt-1">{installation.location}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 cursor-pointer"
          >
            ✕
          </Button>
        </div>
        
        {installation.website && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm">
              <span className="font-medium">Instance URL:</span>{' '}
              <a
                href={installation.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cbioportal-blue hover:underline cursor-pointer"
              >
                {installation.website.replace(/^https?:\/\//, '')}
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstallationDetails;
