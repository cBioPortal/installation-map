
import { Button } from "@/components/ui/button";
import { MapPin, PlusCircle, ExternalLink, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-white py-5"
    }`}>
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <div className="flex items-center">
            <img 
              src="/cd267ca7-8949-4a25-b102-9bf6ed3296a7.png"
              alt="cBioPortal Logo" 
              className="h-10 mr-3 cursor-pointer" 
            />
          </div>
          <button 
            className="sm:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row w-full sm:w-auto`}>
          <ul className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <li>
              <a 
                href="#map" 
                className="flex items-center text-gray-600 hover:text-cbioportal-blue transition-colors cursor-pointer group"
                onClick={(e) => handleSmoothScroll(e, "map")}
              >
                <MapPin className="w-4 h-4 mr-2 group-hover:text-cbioportal-blue transition-colors" />
                <span className="font-medium">Map</span>
              </a>
            </li>
            <li>
              <a 
                href="#add-installation" 
                className="flex items-center text-gray-600 hover:text-cbioportal-blue transition-colors cursor-pointer group"
                onClick={(e) => handleSmoothScroll(e, "add-installation")}
              >
                <PlusCircle className="w-4 h-4 mr-2 group-hover:text-cbioportal-blue transition-colors" />
                <span className="font-medium">Add Installation</span>
              </a>
            </li>
            <li className="sm:ml-4">
              <Button 
                variant="outline" 
                className="border-cbioportal-blue text-cbioportal-blue hover:bg-cbioportal-blue hover:text-white inline-flex items-center cursor-pointer transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <a 
                  href="https://www.cbioportal.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center cursor-pointer"
                >
                  Visit cBioPortal
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
