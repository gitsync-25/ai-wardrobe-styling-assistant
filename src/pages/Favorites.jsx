import React, {
  useEffect,
  useState
} from "react";

import { supabase } from "../supabase";

function Favorites() {

  const [favorites, setFavorites] =
    useState([]);

  useEffect(() => {

    fetchFavorites();

  }, []);

  const fetchFavorites = async () => {

    const {
      data,
      error
    } = await supabase
      .from("favorite_outfits")
      .select("*");

    if (error) {

      console.log(error.message);

      return;
    }

    setFavorites(data);
  };

  const deleteFavorite = async (
    id
  ) => {

    const { error } =
      await supabase
        .from("favorite_outfits")
        .delete()
        .eq("id", id);

    if (error) {

      alert(error.message);

      return;
    }

    setFavorites((prev) =>

      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  return (

    <div className="dashboard-content">

      <h1>
        Favorite Outfits ❤️
      </h1>

      <p>
        Your saved outfit combinations.
      </p>

      {
        favorites.length === 0 ? (

          <p className="empty-message">

            No favorite outfits yet 😭

          </p>

        ) : (

          <div className="outfits-grid">

            {
              favorites.map(
                (outfit, index) => (

                  <div
                    key={index}
                    className="outfit-card"
                  >

                    <button
                      className="favorite-delete-btn"
                      onClick={() =>
                        deleteFavorite(outfit.id)
                      }
                    >

                      Delete

                    </button>

                    <h3 className="favorite-title">

                      Favorite Outfit ❤️

                    </h3>

                    <div className="favorite-images">

                      <img
                        src={outfit.shirt_url}
                        alt=""
                        className="outfit-image"
                      />

                      <img
                        src={outfit.pant_url}
                        alt=""
                        className="outfit-image"
                      />

                      <img
                        src={outfit.shoe_url}
                        alt=""
                        className="outfit-image"
                      />

                    </div>

                  </div>
                )
              )
            }

          </div>
        )
      }

    </div>
  );
}

export default Favorites;