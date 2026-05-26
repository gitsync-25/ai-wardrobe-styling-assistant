import React, {
  useEffect,
  useState
} from "react";

import { supabase } from "../supabase";

import {
  generateFashionAdvice
} from "../gemini";

function OutfitSuggestions() {

  const [outfits, setOutfits] =
    useState([]);

  const [occasionFilter, setOccasionFilter] =
    useState("All");

  const [loadingId, setLoadingId] =
    useState(null);

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

      return;
    }

    generateOutfits(data);
  };

  const generateBadge = (
    shirt,
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

  const generateOutfits = (
    data
  ) => {

    const shirts =
      data.filter(
        (item) =>

          item.category ===
            "Shirts" ||

          item.category ===
            "T-Shirts"
      );

    const pants =
      data.filter(
        (item) =>
          item.category ===
          "Pants"
      );

    const shoes =
      data.filter(
        (item) =>
          item.category ===
          "Shoes"
      );

    const combinations = [];

    shirts.forEach((shirt) => {

      pants.forEach((pant) => {

        shoes.forEach((shoe) => {

          let score = 0;

          if (
            shirt.color !==
            pant.color
          ) {

            score += 5;
          }

          if (
            shoe.color ===
            "White"
          ) {

            score += 3;
          }

          combinations.push({

            shirt,
            pant,
            shoe,

            score,

            badge:
              generateBadge(
                shirt,
                shoe
              ),

            explanation:
              generateExplanation(
                shirt,
                pant,
                shoe
              ),

            aiText: "",
          });
        });
      });
    });

    combinations.sort(
      (a, b) =>
        b.score - a.score
    );

    setOutfits(combinations);
  };

  const saveOutfit = async (
    outfit
  ) => {

    const { error } =
      await supabase
        .from(
          "favorite_outfits"
        )
        .insert([
          {

            shirt_url:
              outfit.shirt
                .image_url,

            pant_url:
              outfit.pant
                .image_url,

            shoe_url:
              outfit.shoe
                .image_url,
          },
        ]);

    if (error) {

      alert(error.message);

      return;
    }

    alert(
      "Outfit saved ❤️"
    );
  };

  const getAIAdvice = async (
  outfit,
  index
) => {

  try {

    setLoadingId(index);

    const prompt = `

Suggest a stylish fashion explanation for this outfit:

Shirt:
${outfit.shirt.color}
${outfit.shirt.category}

Pant:
${outfit.pant.color}
${outfit.pant.category}

Shoes:
${outfit.shoe.color}
${outfit.shoe.category}

Occasion:
${outfit.shirt.occasion}

Keep it short, modern, and stylish.
`;

    const response =
      await generateFashionAdvice(
        prompt
      );

    const updatedOutfits =
      [...outfits];

    updatedOutfits[index].aiText =
      response;

    setOutfits(
      updatedOutfits
    );
  }

  catch (error) {

    console.log(error);

    alert(
      "Gemini AI failed 😭"
    );
  }

  finally {

    setLoadingId(null);
  }
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

        {
          [
            "All",
            "Casual",
            "Office",
            "Party",
            "Gym",
          ].map((type) => (

            <button
              key={type}
              onClick={() =>
                setOccasionFilter(
                  type
                )
              }
            >

              {type}

            </button>
          ))
        }

      </div>

      <div className="outfits-grid">

        {
          outfits

            .filter((outfit) =>

              occasionFilter ===
              "All"

                ? true

                : outfit.shirt
                    .occasion ===
                  occasionFilter
            )

            .map(
              (
                outfit,
                index
              ) => (

                <div
                  key={index}
                  className="outfit-card"
                >

                  <div className="outfit-badge">

                    {outfit.badge}

                  </div>

                  <h3 className="outfit-score">

                    Match Score:
                    {" "}
                    {outfit.score}/10

                  </h3>

                  <p className="outfit-explanation">

                    {
                      outfit.explanation
                    }

                  </p>

                  <div className="favorite-images">

                    <img
                      src={
                        outfit.shirt
                          .image_url
                      }
                      alt=""
                      className="outfit-image"
                    />

                    <img
                      src={
                        outfit.pant
                          .image_url
                      }
                      alt=""
                      className="outfit-image"
                    />

                    <img
                      src={
                        outfit.shoe
                          .image_url
                      }
                      alt=""
                      className="outfit-image"
                    />

                  </div>

                  <div
                    style={{
                      marginTop:
                        "18px",
                      display:
                        "flex",
                      gap: "10px",
                      justifyContent:
                        "center",
                    }}
                  >

                    <button
                      className="favorite-btn"
                      onClick={() =>
                        saveOutfit(
                          outfit
                        )
                      }
                    >

                      ❤️ Save

                    </button>

                    <button
                      className="ai-btn"
                      onClick={() =>
                        getAIAdvice(
                          outfit,
                          index
                        )
                      }
                    >

                      {
                        loadingId ===
                        index

                          ? "Thinking..."

                          : "🤖 AI Advice"
                      }

                    </button>

                  </div>

                  {
                    outfit.aiText && (

                      <div className="ai-response">

                        {
                          outfit.aiText
                        }

                      </div>
                    )
                  }

                </div>
              )
            )
        }

      </div>

    </div>
  );
}

export default OutfitSuggestions;