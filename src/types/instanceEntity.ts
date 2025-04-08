export interface InstanceEntity {
    name: string;
    email: string;
    company_name: string;
    contact_name: string;
    city: string;
    country: string;
    longitude: number;
    latitude: number;
    cbioportal_version?: string;
    cbioportal_web_link?: string;
    installation_method?: string;
    hardware_platform?: string;
}
