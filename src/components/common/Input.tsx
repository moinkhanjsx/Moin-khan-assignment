import React from 'react';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`border rounded p-2 ${className}`}
    />
  );
};

export default Input;