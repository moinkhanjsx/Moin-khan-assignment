import React, { useState, useRef } from 'react';
import { ColumnData } from '../../types/spreadsheet';

interface SpreadsheetHeaderProps {
  columns: ColumnData[];
  onResizeColumn: (columnId: string, width: number) => void;
  onToggleColumnVisibility: (columnId: string) => void;
}

const SpreadsheetHeader: React.FC<SpreadsheetHeaderProps> = ({
  columns,
  onResizeColumn,
  onToggleColumnVisibility
}) => {
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // Start column resize
  const handleResizeStart = (e: React.MouseEvent, columnId: string, currentWidth: number) => {
    e.preventDefault();
    setResizingColumn(columnId);
    setStartX(e.clientX);
    setStartWidth(currentWidth);
    
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  // Handle resize movement
  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingColumn) return;
    
    const diff = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + diff); // Minimum width of 50px
    
    if (headerRef.current) {
      const columnElement = headerRef.current.querySelector(`[data-column-id="${resizingColumn}"]`);
      if (columnElement) {
        (columnElement as HTMLElement).style.width = `${newWidth}px`;
      }
    }
  };

  // End column resize
  const handleResizeEnd = (e: MouseEvent) => {
    if (resizingColumn) {
      const diff = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + diff);
      onResizeColumn(resizingColumn, newWidth);
      
      setResizingColumn(null);
    }
    
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Toggle column visibility
  const handleToggleVisibility = (columnId: string) => {
    onToggleColumnVisibility(columnId);
  };

  return (
    <div className="flex" ref={headerRef}>
      {/* Empty corner cell */}
      <div className="w-10 bg-gray-100 border border-gray-200" />
      
      {/* Column headers */}
      {columns.map(column => (
        <div
          key={column.id}
          className="relative flex items-center justify-center bg-gray-100 border border-gray-200 font-medium p-2 select-none"
          style={{ width: `${column.width}px`, minWidth: `${column.width}px` }}
          data-column-id={column.id}
        >
          <div className="flex-1 text-center">{column.title}</div>
          
          {/* Column options menu trigger */}
          <div className="absolute right-0 top-0 h-full flex items-center px-1">
            <button
              className="text-gray-500 hover:text-gray-700 p-1"
              onClick={() => handleToggleVisibility(column.id)}
              title="Toggle visibility"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            </button>
          </div>
          
          {/* Resize handle */}
          <div
            className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-500 group"
            onMouseDown={(e) => handleResizeStart(e, column.id, column.width)}
          >
            <div className="hidden group-hover:block absolute right-0 top-0 h-full w-1 bg-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpreadsheetHeader;