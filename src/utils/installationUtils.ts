
import { Instance } from "@/types/instance";

export const getUniqueCountriesCount = (instances: Instance[]): number => {
  const uniqueCountries = new Set(
    instances.map(instance => {
      const parts = instance.location.split(", ");
      return parts[parts.length - 1]; // Get the last part which should be the country
    })
  );
  return uniqueCountries.size;
};

export const getUniqueOrganizationsCount = (instances: Instance[]): number => {
  const uniqueOrganizations = new Set(
    instances.map(instance => instance.organization)
  );
  return uniqueOrganizations.size;
};
