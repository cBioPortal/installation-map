import { Download, ArrowDownCircle } from "lucide-react";

interface HeroSectionProps {
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

const HeroSection = ({ handleSmoothScroll }: HeroSectionProps) => {
  return (
    <section className="section-padding relative overflow-hidden pt-16 pb-6">
      <div className="absolute inset-0 bg-hero-pattern bg-no-repeat bg-right-top opacity-5 mix-blend-overlay"></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cbioportal-darkBlue to-cbioportal-blue text-transparent bg-clip-text animate-gradient-x">
            cBioPortal Instances
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-6">
            Explore the worldwide community of cBioPortal instances. See where researchers and institutions are using our platform to advance cancer research and precision medicine.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <a 
              href="#add-installation" 
              className="group flex items-center text-cbioportal-blue hover:text-cbioportal-darkBlue transition-colors cursor-pointer"
              onClick={(e) => handleSmoothScroll(e, "add-installation")}
            >
              <span className="mr-2 font-medium">Add Your Instance to Map</span>
              <ArrowDownCircle className="h-5 w-5" />
            </a>

            <a
              href="https://www.cbioportal.org/visualize"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center text-cbioportal-blue hover:text-cbioportal-darkBlue transition-colors cursor-pointer"
            >
              <span className="mr-2 font-medium">Install cBioPortal</span>
              <Download className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
