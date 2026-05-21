import AuthRedirect from "./components/AuthRedirect";
import Dashboard from "./pages/Dashboard";
import MyWardrobe from "./pages/MyWardrobe";
import OutfitSuggestions from "./pages/OutfitSuggestions";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

import { supabase } from "./supabase";

import Loader from "./components/Loader";

import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import {
  useLocation,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const [session, setSession] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const location = useLocation();

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  useEffect(() => {

    supabase.auth.getSession()
      .then(({ data: { session } }) => {

        setSession(session);
      });

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setSession(session);
      }
    );

    return () => {

      authListener.subscription.unsubscribe();
    };

  }, []);

  if (loading) {

    return <Loader />;
  }

  return (

    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        <Route
          path="/"
          element={
            <Home session={session} />
          }
        />

        <Route
          path="/login"
          element={

            <AuthRedirect session={session}>

              <Login />

            </AuthRedirect>
          }
        />

        <Route
          path="/register"
          element={

            <AuthRedirect session={session}>

              <Register />

            </AuthRedirect>
          }
        />

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute session={session}>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/wardrobe"
          element={

            <ProtectedRoute session={session}>

              <MyWardrobe />

            </ProtectedRoute>
          }
        />

        <Route
          path="/suggestions"
          element={

            <ProtectedRoute session={session}>

              <OutfitSuggestions />

            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={

            <ProtectedRoute session={session}>

              <Settings />

            </ProtectedRoute>
          }
        />

      </Routes>

    </AnimatePresence>
  );
}

export default App;