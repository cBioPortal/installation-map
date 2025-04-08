export interface Instance {
  id: string;
  name: string;
  organization: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  website?: string;
  contactEmail?: string;
}