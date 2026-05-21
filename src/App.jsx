import { supabase } from "./supabase";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

  const timer = setTimeout(() => {

    setLoading(false);

  }, 2500);

  return () => clearTimeout(timer);

}, []);
  const location = useLocation();
  

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

  <Routes location={location} key={location.pathname}>
        
        <Route
  path="/"
  element={
    <Home session={session} />
  }
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        </Routes>
      </AnimatePresence>

    
  );
}

export default App;