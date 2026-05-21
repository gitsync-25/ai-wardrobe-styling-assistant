import React from "react";

import { Navigate } from "react-router-dom";

function AuthRedirect({
  session,
  children
}) {

  if (session) {

    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AuthRedirect;