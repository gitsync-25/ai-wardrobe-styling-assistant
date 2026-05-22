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
          item.category === "Shirts"
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

          combinations.push({

            shirt,
            pant,
            shoe,
          });
        });
      });
    });

    setOutfits(combinations);
  };

  return (

    <div className="dashboard-content">

      <h1>
        Outfit Suggestions ✨
      </h1>

      <p>
        AI-generated outfit combinations.
      </p>

      <div className="outfits-grid">

        {
          outfits.map(
            (outfit, index) => (

            <div
              key={index}
              className="outfit-card"
            >

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