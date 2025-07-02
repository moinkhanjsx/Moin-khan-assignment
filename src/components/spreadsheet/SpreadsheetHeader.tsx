import React, { useState, useRef, useEffect } from 'react';

interface SpreadsheetHeaderProps {
  columns: string[];
  visibleColumns: string[];
  onResizeColumn?: (columnId: string, width: number) => void;
  onToggleColumnVisibility: (columnId: string) => void;
}

const columnLabels: Record<string, string> = {
  id: '#',
  jobRequest: 'Job Request',
  submitted: 'Submitted',
  status: 'Status',
  submitter: 'Submitter',
  url: 'URL',
  assigned: 'Assigned',
  priority: 'Priority',
  dueDate: 'Due Date',
  estValue: 'Est. Value',
};

const SpreadsheetHeader: React.FC<SpreadsheetHeaderProps> = ({
  columns,
  visibleColumns,
  onResizeColumn,
  onToggleColumnVisibility
}) => {
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    id: 40,
    jobRequest: 240,
    submitted: 120,
    status: 120,
    submitter: 120,
    url: 120,
    assigned: 120,
    priority: 120,
    dueDate: 120,
    estValue: 120,
  });
  
  const headerRef = useRef<HTMLDivElement>(null);

  // Start column resize
  const handleResizeStart = (e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    const currentWidth = columnWidths[columnId] || 120;
    
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
    const newWidth = Math.max(40, startWidth + diff); // Minimum width of 40px
    
    // Update column width state
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }));
    
    // Update the DOM immediately for smooth resizing
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
      const newWidth = Math.max(40, startWidth + diff);
      
      // Update final width state
      setColumnWidths(prev => {
        const updatedWidths = {
          ...prev,
          [resizingColumn]: newWidth
        };
        
        // Update the grid template columns
        const root = document.documentElement;
        const templateColumns = columns
          .filter(col => visibleColumns.includes(col))
          .map(col => `${updatedWidths[col] || 120}px`)
          .join(' ');
        
        root.style.setProperty('--grid-template-columns', templateColumns);
        
        return updatedWidths;
      });
      
      if (onResizeColumn) {
        onResizeColumn(resizingColumn, newWidth);
      }
      
      setResizingColumn(null);
    }
    
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Apply column widths to CSS custom properties for grid layout
  useEffect(() => {
    const root = document.documentElement;
    
    // Build the grid-template-columns value based on visible columns
    if (columns && visibleColumns) {
      const templateColumns = columns
        .filter(col => visibleColumns.includes(col))
        .map(col => `${columnWidths[col] || 120}px`)
        .join(' ');
      
      root.style.setProperty('--grid-template-columns', templateColumns);
    }
    
    // Also set individual column width properties
    Object.entries(columnWidths).forEach(([columnId, width]) => {
      root.style.setProperty(`--col-${columnId}-width`, `${width}px`);
    });
  }, [columnWidths, columns, visibleColumns]);

  return (
    <div className="grid-table-header" ref={headerRef}>
      {columns.filter(col => visibleColumns.includes(col)).map((column) => (
        <div
          key={column}
          className={`relative flex items-center p-2 text-xs font-medium text-gray-700 border-r border-gray-200 ${column === 'id' ? 'sticky left-0 bg-gray-50 z-10' : ''}`}
          style={{ width: `${columnWidths[column]}px`, minWidth: `${columnWidths[column]}px` }}
          data-column-id={column}
        >
          <div className="flex-1">
            {columnLabels[column] || column}
          </div>
          
          {/* Column options */}
          <div className="flex items-center space-x-1">
            <button
              className="text-gray-400 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={() => onToggleColumnVisibility(column)}
              title="Toggle column visibility"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          
          {/* Resize handle */}
          <div
            className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-500 group"
            onMouseDown={(e) => handleResizeStart(e, column)}
          >
            <div className="hidden group-hover:block absolute right-0 top-0 h-full w-1 bg-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpreadsheetHeader;