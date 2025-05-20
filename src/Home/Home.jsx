import React from "react";
import Hero from "./Hero";
import HotDessert from "./HotDessert";
import Banner from "./Banner";
import PopularRecipe from "./PopularRecipe";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <>
      <div className=" relative overflow-hidden">
        <Hero />
      </div>
      <HotDessert />
      <Banner/>
      <PopularRecipe/>
      <Testimonial/>
    </>
  );
};

export default Home;
