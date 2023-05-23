import React from 'react';
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div>
      <h3>404 - Resource does not exist</h3>
      {location.state &&
        location.state.originalUrl &&
        location.state.originalUrl}
    </div>
  );
};

export default NotFound;
