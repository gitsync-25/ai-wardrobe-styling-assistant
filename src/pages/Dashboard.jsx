

import React, {
  useEffect,
  useState
} from "react";



import {
  useLocation,
  Link
} from "react-router-dom";

import { supabase } from "../supabase";

function Dashboard() {

  const location =
    useLocation();

  const [wardrobeCount,
    setWardrobeCount] =
    useState(0);

  const [favoriteCount,
    setFavoriteCount] =
    useState(0);

  const [recentItems,
    setRecentItems] =
    useState([]);

    const [username,
  setUsername] =
  useState("");

  useEffect(() => {


    
  fetchStats();
  



}, []);

  const fetchStats = async () => {

    

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  setUsername(
  user.user_metadata?.username ||
  user.user_metadata?.full_name ||
  user.email?.split("@")[0] ||
  "User"
);

  const {
    count: wardrobeItems
  } = await supabase
    .from("wardrobe_items")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  const {
    count: favoriteItems
  } = await supabase
    .from("favorite_outfits")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  const {
    data: recentData
  } = await supabase
    .from("wardrobe_items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  setWardrobeCount(
    wardrobeItems || 0
  );

  setFavoriteCount(
    favoriteItems || 0
  );

  setRecentItems(
    recentData || []
  );
};

  return (

    <div className="dashboard-page">

      <aside className="dashboard-sidebar">

        <h2>
          AI Wardrobe
        </h2>

        <ul>

          <li
            className={
              location.pathname ===
              "/dashboard"

                ? "active-sidebar-link"

                : ""
            }
          >

            <Link to="/dashboard">

              Dashboard

            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/wardrobe"

                ? "active-sidebar-link"

                : ""
            }
          >

            <Link to="/wardrobe">

              My Wardrobe

            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/suggestions"

                ? "active-sidebar-link"

                : ""
            }
          >

            <Link to="/suggestions">

              Outfit Suggestions

            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/favorites"

                ? "active-sidebar-link"

                : ""
            }
          >

            <Link to="/favorites">

              Favorites ❤️

            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/settings"

                ? "active-sidebar-link"

                : ""
            }
          >

            <Link to="/settings">

              Settings

            </Link>

          </li>

        </ul>

      </aside>

      <main className="dashboard-content">

        <h1>
  Welcome Back, {username} 🔥
</h1>

        <p>
          Your AI fashion assistant is ready.
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <h3>
              Wardrobe Items
            </h3>

            <p>
              {wardrobeCount}
            </p>

          </div>

          <div className="dashboard-card">

            <h3>
              Favorite Outfits
            </h3>

            <p>
              {favoriteCount}
            </p>

          </div>

          <div className="dashboard-card">

            <h3>
              AI Ready
            </h3>

            <p>
              🚀
            </p>

          </div>

        </div>

        <div className="recent-uploads">

          <h2>
            Recent Uploads 🧥
          </h2>

          <div className="recent-grid">

            {recentItems.map(
              (item) => (

                <div
                  key={item.id}
                  className="recent-card"
                >

                  <img
                    src={
                      item.image_url
                    }
                    alt=""
                    className="recent-image"
                  />

                  <h4>
                    {item.category}
                  </h4>

                  <p>

                    {item.color}

                    {" • "}

                    {item.occasion}

                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;