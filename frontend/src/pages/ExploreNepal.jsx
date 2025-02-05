import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner"; 
import DestinationSlider from "../components/DestinationSlider";
import Footer from "../components/Footer"; 

const ExploreNepal = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <Banner /> 

      <div className="p-6 flex-grow">
        <h1 className="text-3xl font-semibold text-center text-teal-700">Explore Beautiful Nepal</h1>
        <p className="text-center text-gray-600 mt-2">
          Find amazing destinations and plan your adventure.
        </p>
      </div>

      <div className="mb-10"> 
        <DestinationSlider />
      </div>

      <Footer /> 
    </div>
  );
};

export default ExploreNepal;
