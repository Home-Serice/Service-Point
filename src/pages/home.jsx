import React from "react";
import ToggleButton from '../components/toggle_button';
import SearchBar from "../components/search_bar";
import Card from "../components/card";
import BottomNavbar from "../components/bottom_navbar";







const services = [
  {
    id: 1,
    title: "House Cleaning",
    description: "Professional home cleaning",
    image: "src/assets/house_cleaning.svg", 
  },

  {
    id:2,
    title: "Plumbing Services",
    description: "Expert plumbing solutions",
    image: "src/assets/plumbering.svg"

  },

  {
    id:3,
    title: "Cooking",
    description:"Delicious meals prepared at home",
    image: "src/assets/cooking.svg"
  },

  {
    id:4,
    title: "Pet Care",
    description:"Care for your furry friends",
    image: "src/assets/petservice.svg"
  }
];

const Home = () => {
  return (
    <div className="mb-10 px-4 pb-6">
      <h1 className="text-center text-2xl font-bold mb-9">Service Point</h1>
      <ToggleButton />
      <SearchBar placeholder="Search for services" onSearch={(value) => console.log(value)} />
      
      <h2 className="font-bold text-lg mt-6 mb-3">Popular Services</h2>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Card
            key={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
            onClick={() => navigate_to({id: service.id})}
          />
        ))}
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Home;