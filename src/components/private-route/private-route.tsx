import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactElement;
  isAuthorized: boolean;
};

function PrivateRoute({ children, isAuthorized }: PrivateRouteProps): JSX.Element {
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

