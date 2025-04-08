import {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Instance } from "@/types/instance";
import FormSection from "./form/FormSection";
import ContactFields from "./form/ContactFields";
import InstitutionFields from "./form/InstitutionFields";
import LocationFields from "./form/LocationFields";
import VersionField from "./form/VersionField";
import WebLinkField from "./form/WebLinkField";
import DockerUsageField from "./form/DockerUsageField";
import HardwarePlatformField from "./form/HardwarePlatformField";
import { formSchema, FormValues } from "./form/types";
import {useLoadScript} from "@react-google-maps/api";

interface InstallationFormProps {
  onAddInstallation: (installation: Instance) => void;
}

const InstallationForm = ({ onAddInstallation }: InstallationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      institutionName: "",
      contactNameOrGroup: "",
      city: "",
      country: "",
      cbioportalVersion: "",
      webLink: "",
      usedDocker: "not_sure",
      hardwarePlatform: "desktop",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Mock geocoding function - in production, you'd use a real geocoding service
      const mockGeocode = (city: string, country: string): [number, number] => {
        const seed = (city + country).length;
        const lon = (seed * 13) % 360 - 180;
        const lat = (seed * 7) % 180 - 90;
        return [lon, lat];
      };
      
      const coordinates = mockGeocode(data.city, data.country);
      
      const newInstallation: Instance = {
        id: Date.now().toString(),
        name: data.institutionName,
        organization: data.contactNameOrGroup,
        location: `${data.city}, ${data.country}`,
        coordinates,
        website: data.webLink,
        // Private information not included in the installation object
      };
      
      // Add the new installation
      onAddInstallation(newInstallation);

      // Reset the form
      form.reset();
      
      // Show success message
      toast({
        title: "Instance added!",
        description: "Your cBioPortal instance has been added to the map.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding your instance.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <FormSection>
            <ContactFields form={form} />
          </FormSection>

          <FormSection>
            <InstitutionFields form={form} />
          </FormSection>

          <FormSection>
            <LocationFields form={form} />
          </FormSection>

          <VersionField form={form} />
          
          <WebLinkField form={form} />
          
          <DockerUsageField form={form} />

          <HardwarePlatformField form={form} />
        </div>

        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="bg-cbioportal-blue hover:bg-cbioportal-darkBlue text-white px-8 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InstallationForm;
