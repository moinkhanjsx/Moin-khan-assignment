import React, { useState, useRef, useEffect } from 'react';

interface EditableCellProps {
  value: string;
  row: number;
  col: number;
  isSelected: boolean;
  onUpdate: (value: string) => void;
  onCellFocus: () => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ 
  value, 
  row, 
  col, 
  isSelected, 
  onUpdate, 
  onCellFocus 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle double click to start editing
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  
  // Handle Enter key to finish editing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      finishEditing();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };
  
  // Handle F2 key to start editing when cell is selected
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelected && e.key === 'F2') {
        e.preventDefault();
        setIsEditing(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected]);
  
  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  // Finish editing and save value
  const finishEditing = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onUpdate(editValue);
    }
  };
  
  // Cancel editing and revert to original value
  const cancelEditing = () => {
    setIsEditing(false);
    setEditValue(value);
  };
  
  // Handle click outside to finish editing
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditing && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        finishEditing();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editValue, value, finishEditing]);
  
  // Update the edit value when the original value changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);
  
  return (
    <div 
      className={`h-full w-full ${isSelected ? 'cell-selected' : ''}`}
      onDoubleClick={handleDoubleClick}
      onClick={onCellFocus}
      data-row={row}
      data-col={col}
      role="gridcell"
      tabIndex={isSelected ? 0 : -1}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          className="w-full h-full border-none outline-none bg-white px-2 py-1"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={finishEditing}
        />
      ) : (
        <div className="p-2 truncate">{value}</div>
      )}
    </div>
  );
};

export default EditableCell;
