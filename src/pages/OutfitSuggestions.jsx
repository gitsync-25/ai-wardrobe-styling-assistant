import React, {
  useEffect,
  useState
} from "react";

import { supabase } from "../supabase";

function OutfitSuggestions() {

  const [items, setItems] =
    useState([]);

  const [outfits, setOutfits] =
    useState([]);

  const [occasionFilter, setOccasionFilter] =
    useState("All");

  useEffect(() => {

    fetchWardrobe();

  }, []);

  const fetchWardrobe = async () => {

    const {
      data,
      error
    } = await supabase
      .from("wardrobe_items")
      .select("*");

    if (error) {

      console.log(error.message);

      return;
    }

    setItems(data);

    generateOutfits(data);
  };

  const generateOutfits = (data) => {

    const shirts =
      data.filter(
        (item) =>

          item.category === "Shirts" ||

          item.category === "T-Shirts"
      );

    const pants =
      data.filter(
        (item) =>
          item.category === "Pants"
      );

    const shoes =
      data.filter(
        (item) =>
          item.category === "Shoes"
      );

    const combinations = [];

    shirts.forEach((shirt) => {

      pants.forEach((pant) => {

        shoes.forEach((shoe) => {

          const goodMatch = true;

          if (goodMatch) {

            let score = 0;

            if (
              shirt.color !== pant.color
            ) {

              score += 5;
            }

            if (
              shoe.color === "White"
            ) {

              score += 3;
            }

            combinations.push({

              shirt,
              pant,
              shoe,

              score,
            });
          }
        });
      });
    });

    const sortedOutfits =
      combinations.sort(
        (a, b) => b.score - a.score
      );

    setOutfits(sortedOutfits);
  };

  return (

    <div className="dashboard-content">

      <h1>
        Outfit Suggestions ✨
      </h1>

      <p>
        AI-generated outfit combinations.
      </p>

      <div className="filter-buttons">

        <button
          onClick={() =>
            setOccasionFilter("All")
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setOccasionFilter("Casual")
          }
        >
          Casual
        </button>

        <button
          onClick={() =>
            setOccasionFilter("Office")
          }
        >
          Office
        </button>

        <button
          onClick={() =>
            setOccasionFilter("Party")
          }
        >
          Party
        </button>

        <button
          onClick={() =>
            setOccasionFilter("Gym")
          }
        >
          Gym
        </button>

      </div>

      <div className="outfits-grid">

        {
          outfits
            .filter((outfit) =>

              occasionFilter === "All"

                ? true

                : outfit.shirt.occasion ===
                  occasionFilter
            )
            .map(
              (outfit, index) => (

                <div
                  key={index}
                  className="outfit-card"
                >

                  <h3 className="outfit-score">

                    Match Score:
                    {outfit.score}/10

                  </h3>

                  <img
                    src={outfit.shirt.image_url}
                    alt=""
                    className="outfit-image"
                  />

                  <img
                    src={outfit.pant.image_url}
                    alt=""
                    className="outfit-image"
                  />

                  <img
                    src={outfit.shoe.image_url}
                    alt=""
                    className="outfit-image"
                  />

                </div>
              ))
        }

      </div>

    </div>
  );
}

export default OutfitSuggestions;