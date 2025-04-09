import {useEffect, useState} from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import AddInstallationSection from "@/components/AddInstallationSection";
import Footer from "@/components/Footer";
import {useSearchParams} from "react-router-dom";

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams()
  const isSmall = searchParams.get('small') === '1';

  useEffect(() => {
    // Fetch JSON from the public directory
    fetch('/auto_generated_waypoints.json') // Assuming the file is named data.json and located in the public directory
        .then(response => response.json())
        .then(jsonData => {
          setData(jsonData);
          setIsLoaded(true);
        })
        .catch(err => {
          setError('Failed to load data');
          setIsLoaded(false);
        });
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isSmall) {
    return <MapSection small={true} installations={data} />
  }

  return (isLoaded &&
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      
      <main>
        <HeroSection handleSmoothScroll={handleSmoothScroll} />
        <div className="container mx-auto pt-6 pb-12">
          <MapSection installations={data} />
        </div>
        <div className="container mx-auto py-12">
          <AddInstallationSection />
        </div>
      </main>
      <div className={"mt-auto"}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
