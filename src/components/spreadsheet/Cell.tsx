import React, { useState, useEffect, useRef } from 'react';
import { formatCellValue } from '../../utils/spreadsheet';
import { CellData } from '../../types/spreadsheet';

interface CellProps {
  data: CellData;
  isSelected: boolean;
  onChange: (value: string | number) => void;
  onSelect: () => void;
}

const Cell: React.FC<CellProps> = ({ 
  data, 
  isSelected, 
  onChange, 
  onSelect 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle selection and editing mode
  useEffect(() => {
    if (isSelected && inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isSelected, isEditing]);

  // Start editing on double click
  const handleDoubleClick = () => {
    if (data.isEditable !== false) {
      setIsEditing(true);
      setInputValue(String(data.value));
    }
  };

  // Handle cell selection on click
  const handleClick = () => {
    onSelect();
  };

  // Handle value change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key events in edit mode
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  // Finish editing and save changes
  const finishEditing = () => {
    setIsEditing(false);
    // Try to convert to number if possible
    const numValue = Number(inputValue);
    const newValue = !isNaN(numValue) && inputValue !== '' ? numValue : inputValue;
    onChange(newValue);
  };

  // Cancel editing without saving
  const cancelEditing = () => {
    setIsEditing(false);
    setInputValue(String(data.value));
  };

  // Handle blur event (click outside)
  const handleBlur = () => {
    finishEditing();
  };

  return (
    <div 
      className={`
        border border-gray-200 p-2 min-w-[100px] h-[30px] overflow-hidden 
        ${isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-white'} 
        ${isEditing ? 'p-0' : ''}
      `}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      data-row={data.row}
      data-col={data.col}
      style={{ cursor: data.isEditable === false ? 'default' : 'cell' }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full h-full px-2 outline-none border-none"
          autoFocus
        />
      ) : (
        <div className="truncate">
          {formatCellValue(data.value)}
        </div>
      )}
    </div>
  );
};

export default Cell;