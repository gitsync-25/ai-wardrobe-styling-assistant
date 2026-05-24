import React from "react";

import {
  Link
} from "react-router-dom";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2>
        AI Wardrobe
      </h2>

      <ul>

        <li>
          <Link to="/dashboard">

            Dashboard

          </Link>
        </li>

        <li>
          <Link to="/wardrobe">

            My Wardrobe

          </Link>
        </li>

        <li>
          <Link to="/suggestions">

            Outfit Suggestions

          </Link>
        </li>

        <li>
          <Link to="/favorites">

            Favorites ❤️

          </Link>
        </li>

        <li>
          <Link to="/settings">

            Settings

          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;