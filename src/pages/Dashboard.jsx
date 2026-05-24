import React from "react";

import {
  useLocation,
  Link
} from "react-router-dom";

function Dashboard() {

  const location = useLocation();

  return (

    <div className="dashboard-page">

      <aside className="dashboard-sidebar">

        <h2>
          AI Wardrobe
        </h2>

        <ul>

          <li
            className={
              location.pathname === "/dashboard"
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
              location.pathname === "/wardrobe"
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
              location.pathname === "/suggestions"
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
              location.pathname === "/favorites"
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
              location.pathname === "/settings"
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
          Welcome Back 🔥
        </h1>

        <p>
          Your AI fashion assistant is ready.
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <h3>
              Total Outfits
            </h3>

            <p>
              12
            </p>

          </div>

          <div className="dashboard-card">

            <h3>
              AI Suggestions
            </h3>

            <p>
              48
            </p>

          </div>

          <div className="dashboard-card">

            <h3>
              Wardrobe Items
            </h3>

            <p>
              34
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;