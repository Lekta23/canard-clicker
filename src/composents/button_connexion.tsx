import React from "react";

interface ButtonProps {
  label: string;
  className?: string;
}

const ButtonConnexion = ({ label, className }: ButtonProps) => {
  return <button className={className}>{label}</button>;
};

export default ButtonConnexion;
