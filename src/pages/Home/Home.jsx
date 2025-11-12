import React from "react";

import HowItWorks from "../../components/HowItWorks";
import FeaturedFoods from "../../components/FeaturedFoods";
import Mission from "../../components/Mission";

const Home = () => {
  return (
    <div>
      <div>
        <FeaturedFoods />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <Mission />
      </div>
    </div>
  );
};

export default Home;
