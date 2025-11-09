import React from "react";

const FoodCard = ({ food }) => {
  const {
    food_name,
    food_image,
    // food_quantity,
    // pickup_location,
    // expire_date,
    additional_notes,
  } = food;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={food_image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{food_name}</h2>
        <p>{additional_notes}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
