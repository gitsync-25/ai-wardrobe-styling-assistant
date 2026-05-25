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

  console.log(error);

  alert(error.message);

  return;
}

    setItems(data);

    generateOutfits(data);
  };

  const generateBadge = (
  shirt,
  pant,
  shoe
) => {

  if (
    shirt.occasion === "Office"
  ) {

    return "💼 Office Ready";
  }

  if (
    shirt.occasion === "Party"
  ) {

    return "🎉 Party Pick";
  }

  if (
    shirt.occasion === "Gym"
  ) {

    return "🏋 Gym Combo";
  }

  if (
    shoe.color === "White"
  ) {

    return "✨ Minimal Fit";
  }

  return "🔥 Trending";
};

const generateExplanation = (
  shirt,
  pant,
  shoe
) => {

  let text = "";

  if (
    shirt.color !== pant.color
  ) {

    text +=
      `${shirt.color} ${shirt.category} pairs nicely with ${pant.color} ${pant.category}. `;
  }

  if (
    shoe.color === "White"
  ) {

    text +=
      "White shoes add a clean modern finish. ";
  }

  if (
    shirt.occasion === "Office"
  ) {

    text +=
      "Perfect for professional office styling.";
  }

  else if (
    shirt.occasion === "Party"
  ) {

    text +=
      "Great choice for parties and evening outings.";
  }

  else if (
    shirt.occasion === "Gym"
  ) {

    text +=
      "Comfortable sporty combination for active wear.";
  }

  else {

    text +=
      "A stylish casual everyday outfit.";
  }

  return text;
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

explanation:
  generateExplanation(
    shirt,
    pant,
    shoe
  ),
  badge:
  generateBadge(
    shirt,
    pant,
    shoe
  ),
            }
          );
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

  <button
  className="favorite-btn"
  onClick={() =>
    saveOutfit(outfit)
  }
>

  ❤️ Save

</button>
const saveOutfit = async (
  outfit
) => {

  const { error } =
    await supabase
      .from("favorite_outfits")
      .insert([
        {

          shirt_url:
            outfit.shirt.image_url,

          pant_url:
            outfit.pant.image_url,

          shoe_url:
            outfit.shoe.image_url,
        }
      ]);

  if (error) {

    console.log(error);

    alert(error.message);

    return;
  }

  alert(
    "Outfit saved ❤️"
  );
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

                            <div className="outfit-badge">

  {outfit.badge}

</div>

                  <h3 className="outfit-score">
                    <button
  className="favorite-btn"
  onClick={() =>
    saveOutfit(outfit)
  }
>

  ❤️ Save

</button>

                    Match Score:
                    {outfit.score}/10

                  </h3>
                    <p className="outfit-explanation">

  {outfit.explanation}

</p>

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