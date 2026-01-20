import React from "react";

import HowItWorks from "../../components/HowItWorks";
import FeaturedFoods from "../../components/FeaturedFoods";
import Mission from "../../components/Mission";
import Categories from "../../components/Categories";
import Testimonials from "../../components/Testimonials";
import Blogs from "../../components/Blogs";
import FAQ from "../../components/FAQ";
import Newsletter from "../../components/Newsletter";

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

      <div>
        <Categories />
      </div>

      <div>
        <Testimonials />
      </div>

      <div>
        <Blogs />
      </div>

      <div>
        <FAQ />
      </div>

      <div>
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
