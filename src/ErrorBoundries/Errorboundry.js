// this Error boundry is Package Installed
// package - react-error-boundry

import React from "react";

const Errorboundry = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>Something went Wrong :</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default Errorboundry;
