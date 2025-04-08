import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import AddInstallationSection from "@/components/AddInstallationSection";
import Footer from "@/components/Footer";
import { Instance } from "@/types/instance";

const Index = () => {
  const [instances, setInstances] = useState<Instance[]>([
    {
      id: "1",
      name: "Memorial Sloan Kettering Cancer Center",
      organization: "MSK",
      location: "New York, USA",
      coordinates: [-74.0060, 40.7128],
      website: "https://www.mskcc.org",
      contactEmail: "contact@mskcc.org",
    },
    {
      id: "2",
      name: "Dana-Farber Cancer Institute",
      organization: "Dana-Farber",
      location: "Boston, USA",
      coordinates: [-71.1097, 42.3601],
      website: "https://www.dana-farber.org",
      contactEmail: "contact@dfci.harvard.edu",
    },
    {
      id: "3",
      name: "Netherlands Cancer Institute",
      organization: "NKI",
      location: "Amsterdam, Netherlands",
      coordinates: [4.8952, 52.3702],
      website: "https://www.nki.nl",
      contactEmail: "info@nki.nl",
    },
    {
      id: "4",
      name: "Karolinska Institutet",
      organization: "Karolinska",
      location: "Stockholm, Sweden",
      coordinates: [18.0686, 59.3293],
      website: "https://ki.se",
      contactEmail: "info@ki.se",
    },
    {
      id: "5",
      name: "Princess Margaret Cancer Centre",
      organization: "UHN",
      location: "Toronto, Canada",
      coordinates: [-79.3832, 43.6532],
      website: "https://www.uhn.ca/PrincessMargaret",
      contactEmail: "info@uhn.ca",
    },
    {
      id: "6", 
      name: "Peter MacCallum Cancer Centre",
      organization: "Peter Mac",
      location: "Melbourne, Australia",
      coordinates: [144.9624, -37.8136],
      website: "https://www.petermac.org",
      contactEmail: "info@petermac.org",
    },
    {
      id: "7",
      name: "German Cancer Research Center",
      organization: "DKFZ",
      location: "Heidelberg, Germany",
      coordinates: [8.6724, 49.3988],
      website: "https://www.dkfz.de",
      contactEmail: "info@dkfz.de",
    },
    {
      id: "8",
      name: "University of Tokyo Hospital",
      organization: "UTokyo",
      location: "Tokyo, Japan",
      coordinates: [139.7594, 35.6895],
      website: "https://www.h.u-tokyo.ac.jp",
      contactEmail: "contact@h.u-tokyo.ac.jp",
    },
    {
      id: "9",
      name: "Sao Paulo State Cancer Institute",
      organization: "ICESP",
      location: "São Paulo, Brazil",
      coordinates: [-46.6333, -23.5505],
      website: "https://www.icesp.org.br",
      contactEmail: "contato@icesp.org.br",
    },
    {
      id: "10",
      name: "King Faisal Specialist Hospital",
      organization: "KFSH",
      location: "Riyadh, Saudi Arabia",
      coordinates: [46.6753, 24.7136],
      website: "https://www.kfsh.com",
      contactEmail: "international@kfsh.med.sa",
    }
  ]);

  const handleAddInstance = (instance: Instance) => {
    setInstances([...instances, instance]);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main>
        <HeroSection handleSmoothScroll={handleSmoothScroll} />
        <div className="container mx-auto pt-6 pb-12">
          <MapSection installations={instances} />
        </div>
        <div className="container mx-auto py-12">
          <AddInstallationSection onAddInstallation={handleAddInstance} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
