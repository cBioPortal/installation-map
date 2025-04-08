
import { Instance } from "@/types/instance";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, Building } from "lucide-react";

interface StatsProps {
  installations: Instance[];
}

const Stats = ({ installations }: StatsProps) => {
  // Count unique countries
  const uniqueCountries = new Set(
    installations.map(installation => {
      const parts = installation.location.split(", ");
      return parts[parts.length - 1]; // Get the last part which should be the country
    })
  );

  // Count unique organizations
  const uniqueOrganizations = new Set(
    installations.map(installation => installation.organization)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-cbioportal-blue">
        <CardContent className="flex items-center p-6">
          <div className="bg-blue-50 p-3 rounded-full mr-4">
            <Globe className="h-5 w-5 text-cbioportal-blue stroke-[1.5]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Countries</p>
            <h3 className="text-2xl font-bold text-gray-800">{uniqueCountries.size}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-cbioportal-blue">
        <CardContent className="flex items-center p-6">
          <div className="bg-blue-50 p-3 rounded-full mr-4">
            <Building className="h-5 w-5 text-cbioportal-blue stroke-[1.5]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Organizations</p>
            <h3 className="text-2xl font-bold text-gray-800">{uniqueOrganizations.size}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-cbioportal-blue">
        <CardContent className="flex items-center p-6">
          <div className="bg-blue-50 p-3 rounded-full mr-4">
            <Users className="h-5 w-5 text-cbioportal-blue stroke-[1.5]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Instances</p>
            <h3 className="text-2xl font-bold text-gray-800">{installations.length}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
