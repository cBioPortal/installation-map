import { Installation } from "@/types/installation";
import {Button} from "@/components/ui/button.tsx";

interface AddInstallationSectionProps {
  onAddInstallation: (installation: Installation) => void;
}

const AddInstallationSection = ({ onAddInstallation }: AddInstallationSectionProps) => {
  return (
    <section id="add-installation" className="section-padding bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-cbioportal-darkBlue">Join Our Map</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              If you're running a cBioPortal instance, submit your info below to connect
              with the wider community and showcase the global impact of cBioPortal.
            </p>
          </div>
          <div className={"flex justify-center"}>
            <Button
                asChild
                className="bg-cbioportal-blue hover:bg-cbioportal-darkBlue text-white px-8 py-2"
            >
              <a target={"_blank"} href={"https://docs.google.com/forms/d/e/1FAIpQLSflQdN956q7Xh5caO8z8jIaF6uMLBkKrSxFvPi8OhNBWB247w/viewform"}>
              {"Submit My Info"}</a>
            </Button>
          </div>
          
          {/*<div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">*/}
          {/*  <InstallationForm onAddInstallation={onAddInstallation} />*/}
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
};

export default AddInstallationSection;
