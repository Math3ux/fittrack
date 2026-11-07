import React from 'react';
import { Navigate } from 'react-router-dom';

interface RotaPrivadaProps {
  children: React.ReactNode;
}

export const RotaPrivada: React.FC<RotaPrivadaProps> = ({ children }) => {
  const estaAutenticado = true; 

  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};