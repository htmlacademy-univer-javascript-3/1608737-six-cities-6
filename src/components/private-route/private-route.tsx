import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: React.ReactElement;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  
  return authorizationStatus === 'AUTH' ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

