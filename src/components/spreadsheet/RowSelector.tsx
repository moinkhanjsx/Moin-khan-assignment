import React from 'react';

interface RowSelectorProps {
  rowIndex: number;
  isSelected: boolean;
  onToggle: (rowIndex: number) => void;
}

const RowSelector: React.FC<RowSelectorProps> = ({ rowIndex, isSelected, onToggle }) => {
  return (
    <div 
      className="w-8 h-full flex items-center justify-center border-r border-gray-200 bg-gray-50"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(rowIndex);
      }}
    >
      <div className={`w-4 h-4 rounded border ${isSelected ? 'bg-blue-500 border-blue-600' : 'border-gray-400'} flex items-center justify-center`}>
        {isSelected && (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
    </div>
  );
};

export default RowSelector;
