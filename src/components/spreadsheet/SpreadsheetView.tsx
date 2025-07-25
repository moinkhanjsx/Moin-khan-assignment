import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useSpreadsheet } from '../../hooks/useSpreadsheet';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import SpreadsheetHeader from './SpreadsheetHeader';

// Define Task interface for the mock data
interface Task {
  id: number;
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: string;
}

const SpreadsheetView: React.FC = () => {
  const { 
    selectedCell, 
    handleCellSelect,
    // Remove the unused handleKeyNavigation
  } = useSpreadsheet();
  
  const spreadsheetRef = useRef<HTMLDivElement>(null);
  const [activeTab] = useState('q3-overview');
  
  // Column names for visibility toggle - wrapped in useMemo to avoid recreating on each render
  const allColumns = useMemo(() => 
    ['id', 'jobRequest', 'submitted', 'status', 'submitter', 'url', 'assigned', 'priority', 'dueDate', 'estValue'],
  []);
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(allColumns);
  
  const [mockTasks, setMockTasks] = useState<Task[]>([
    {
      id: 1,
      jobRequest: 'Launch social media campaign for product X',
      submitted: '15-11-2024',
      status: 'in-process',
      submitter: 'Aisha Patel',
      url: 'www.aishapatel.com',
      assigned: 'Sophie Chaudhury',
      priority: 'Medium',
      dueDate: '20-11-2024',
      estValue: '6,200,000'
    },
    {
      id: 2,
      jobRequest: 'Update press kit for company redesign',
      submitted: '28-10-2024',
      status: 'need-to-start',
      submitter: 'Irfan Khan',
      url: 'www.irfankhan.net',
      assigned: 'Haja Pandey',
      priority: 'High',
      dueDate: '30-10-2024',
      estValue: '3,000,000'
    },
    {
      id: 3,
      jobRequest: 'Finalize user testing feedback for app v2',
      submitted: '05-12-2024',
      status: 'in-process',
      submitter: 'Mark Johnson',
      url: 'www.markjohnson.io',
      assigned: 'Rachel Lee',
      priority: 'Medium',
      dueDate: '10-12-2024',
      estValue: '4,750,000'
    },
    {
      id: 4,
      jobRequest: 'Design new features for the website',
      submitted: '10-01-2025',
      status: 'complete',
      submitter: 'Emily Green',
      url: 'www.emilygreen.co',
      assigned: 'Tom Wright',
      priority: 'Low',
      dueDate: '15-01-2025',
      estValue: '5,800,000'
    },
    {
      id: 5,
      jobRequest: 'Prepare financial report for Q4',
      submitted: '28-01-2025',
      status: 'blocked',
      submitter: 'Jessica Brown',
      url: 'www.jessicabrown.biz',
      assigned: 'Kevin Smith',
      priority: 'Low',
      dueDate: '30-01-2025',
      estValue: '2,850,000'
    }
  ]);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const columnMenuButtonRef = useRef<HTMLButtonElement>(null);
  
  // Column widths state
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

  // Handle column visibility toggle
  const handleToggleColumn = (column: string) => {
    setVisibleColumns(prev => {
      let newVisibleColumns: string[];
      if (prev.includes(column)) {
        // Don't allow hiding all columns
        if (prev.length <= 1) {
          return prev;
        }
        newVisibleColumns = prev.filter(col => col !== column);
      } else {
        newVisibleColumns = [...prev, column];
      }
      
      // After changing visibility, update the grid template columns
      setTimeout(() => {
        updateGridTemplate(newVisibleColumns);
      }, 0);
      
      console.log(`Column visibility toggled for: ${column}`);
      return newVisibleColumns;
    });
  };
  
  // Function to update the grid template columns
  const updateGridTemplate = useCallback((visibleCols: string[]) => {
    const root = document.documentElement;
    const templateColumns = allColumns
      .filter(col => visibleCols.includes(col))
      .map(col => `${columnWidths[col] || 120}px`)
      .join(' ');
    
    root.style.setProperty('--grid-template-columns', templateColumns);
  }, [allColumns, columnWidths]);

  // Helper function to check if a cell is selected
  const isCellSelected = (row: number, col: number) => {
    return selectedCell && selectedCell.row === row && selectedCell.col === col;
  };
  
  // Helper to get the next/previous valid column index considering visibility
  const getNextVisibleColumnIndex = (currentCol: number, direction: 'next' | 'prev') => {
    const visibleCols = allColumns.filter(col => visibleColumns.includes(col));
    const currentVisibleIndex = visibleCols.indexOf(allColumns[currentCol]);
    
    if (currentVisibleIndex === -1) return currentCol; // Not found
    
    if (direction === 'next') {
      if (currentVisibleIndex < visibleCols.length - 1) {
        return allColumns.indexOf(visibleCols[currentVisibleIndex + 1]);
      }
    } else { // prev
      if (currentVisibleIndex > 0) {
        return allColumns.indexOf(visibleCols[currentVisibleIndex - 1]);
      }
    }
    
    return currentCol; // No change if at boundary
  };
  
  // Custom keyboard navigation handler that respects column visibility
  const handleCustomKeyNavigation = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    let newRow = row;
    let newCol = col;
    
    // Prevent default browser scrolling behavior
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      e.preventDefault();
    }
    
    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(mockTasks.length + 19, row + 1); // +19 for empty rows
        break;
      case 'ArrowLeft':
        newCol = getNextVisibleColumnIndex(col, 'prev');
        break;
      case 'ArrowRight':
        newCol = getNextVisibleColumnIndex(col, 'next');
        break;
      case 'Tab':
        if (e.shiftKey) {
          // Move to previous visible cell or previous row's last visible cell
          newCol = getNextVisibleColumnIndex(col, 'prev');
          if (newCol === col && row > 0) {
            newRow = row - 1;
            // Get the last visible column
            const visibleCols = allColumns.filter(col => visibleColumns.includes(col));
            newCol = allColumns.indexOf(visibleCols[visibleCols.length - 1]);
          }
        } else {
          // Move to next visible cell or next row's first visible cell
          newCol = getNextVisibleColumnIndex(col, 'next');
          if (newCol === col && row < mockTasks.length + 19) {
            newRow = row + 1;
            // Get the first visible column
            const visibleCols = allColumns.filter(col => visibleColumns.includes(col));
            newCol = allColumns.indexOf(visibleCols[0]);
          }
        }
        break;
      case 'Enter':
        if (e.shiftKey) {
          newRow = Math.max(0, row - 1);
        } else {
          newRow = Math.min(mockTasks.length + 19, row + 1);
        }
        break;
      default:
        return; // Do nothing for other keys
    }
    
    if (newRow !== row || newCol !== col) {
      handleCellSelect({ row: newRow, col: newCol });
      
      // Ensure the cell is visible by scrolling to it
      setTimeout(() => {
        const cellElement = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
        if (cellElement) {
          cellElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      }, 0);
    }
  }, [selectedCell, mockTasks.length, allColumns, visibleColumns, handleCellSelect, getNextVisibleColumnIndex]);

  // Close column menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnMenuRef.current && 
        !columnMenuRef.current.contains(event.target as Node) &&
        columnMenuButtonRef.current && 
        !columnMenuButtonRef.current.contains(event.target as Node)
      ) {
        setShowColumnMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize grid template columns on component mount and when visibility changes
  useEffect(() => {
    updateGridTemplate(visibleColumns);
  }, [visibleColumns, columnWidths, updateGridTemplate]);
  
  // Add keyboard event listeners for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle key events when the spreadsheet is focused or a cell is selected
      if (document.activeElement === spreadsheetRef.current || 
          (document.activeElement && document.activeElement.closest('.spreadsheet-container'))) {
        handleCustomKeyNavigation(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell, visibleColumns, handleCustomKeyNavigation]);

  const getStatusClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'in-process': return 'bg-yellow-100 text-yellow-800';
      case 'need-to-start': return 'bg-blue-100 text-blue-800';
      case 'complete': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Function to update the task data
  const updateTaskField = (taskId: number, field: keyof Task, value: string) => {
    setMockTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, [field]: value } : task
      )
    );
  };
  
  // Handle column resize
  const handleColumnResize = (columnId: string, width: number) => {
    console.log(`Resized column ${columnId} to ${width}px`);
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: width
    }));
  };

  return (
    <div 
      className="spreadsheet-container bg-white border border-gray-300 overflow-auto mt-0 mx-auto w-full shadow-lg" 
      ref={spreadsheetRef}
      tabIndex={0} // Make the container focusable
      onKeyDown={(e) => handleCustomKeyNavigation(e)}
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <div className={`py-2 px-4 border-r border-gray-200 flex items-center space-x-1 ${activeTab === 'q3-overview' ? 'bg-gray-100' : 'bg-white'}`}>
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-sm font-medium">Q3 Financial Overview</span>
        </div>
        <div className="py-2 px-4 bg-purple-100 text-purple-800 border-r border-gray-200">
          <span className="text-sm">Answer a question</span>
        </div>
        <div className="py-2 px-4 bg-orange-100 text-orange-800 border-r border-gray-200">
          <span className="text-sm">Extract</span>
        </div>
        <div className="py-2 px-4 border-r border-gray-200 flex items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
      
      {/* Toolbar with column visibility toggle */}
      <div className="flex items-center p-2 bg-gray-50 border-b border-gray-200">
        <div className="relative" ref={columnMenuRef}>
          <button
            ref={columnMenuButtonRef}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-1"
            onClick={() => setShowColumnMenu(!showColumnMenu)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <span>Columns</span>
          </button>
          
          {showColumnMenu && (
            <ColumnVisibilityMenu
              columns={allColumns}
              visibleColumns={visibleColumns}
              onToggleColumn={handleToggleColumn}
              onClose={() => setShowColumnMenu(false)}
            />
          )}
        </div>
      </div>
      
      {/* Table Header - Use SpreadsheetHeader component */}
      <SpreadsheetHeader 
        columns={allColumns}
        visibleColumns={visibleColumns}
        onToggleColumnVisibility={handleToggleColumn}
        onResizeColumn={handleColumnResize}
      />
      
      {/* Table Rows */}
      <div className="spreadsheet-body">
        {mockTasks.map((task, rowIndex) => {
          const isSelected = selectedCell && selectedCell.row === rowIndex;
          
          return (
            <div 
              key={task.id} 
              className={`grid-table-row ${isSelected ? 'bg-blue-50' : ''}`}
              onClick={() => handleCellSelect({ row: rowIndex, col: 0 })}
              tabIndex={0}
              data-row={rowIndex}
            >
              {visibleColumns.includes('id') && 
                <div 
                  className={`p-2 text-sm text-gray-600 border-r border-gray-200 w-8 sticky left-0 bg-white ${isCellSelected(rowIndex, 0) ? 'cell-selected' : ''}`}
                  data-row={rowIndex}
                  data-col={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 0 });
                  }}
                >
                  {task.id}
                </div>
              }
              
              {visibleColumns.includes('jobRequest') && 
                <div 
                  className={`p-2 text-sm text-gray-800 border-r border-gray-200 col-span-2 cursor-cell ${isCellSelected(rowIndex, 1) ? 'cell-selected' : ''}`}
                  data-row={rowIndex}
                  data-col={1}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 1 });
                  }}
                  onDoubleClick={() => {
                    const newValue = prompt('Enter new value:', task.jobRequest);
                    if (newValue !== null) {
                      console.log(`Edited job request for task ${task.id}:`, newValue);
                      updateTaskField(task.id, 'jobRequest', newValue);
                    }
                  }}
                >
                  {task.jobRequest}
                </div>
              }
              
              {visibleColumns.includes('submitted') && 
                <div 
                  className={`p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell ${isCellSelected(rowIndex, 2) ? 'cell-selected' : ''}`}
                  data-row={rowIndex}
                  data-col={2}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 2 });
                  }}
                  onDoubleClick={() => {
                    const newValue = prompt('Enter new date (DD-MM-YYYY):', task.submitted);
                    if (newValue !== null) {
                      console.log(`Edited submission date for task ${task.id}:`, newValue);
                      updateTaskField(task.id, 'submitted', newValue);
                    }
                  }}
                >
                  {task.submitted}
                </div>
              }
              
              {visibleColumns.includes('status') && 
                <div 
                  className="p-2 text-sm border-r border-gray-200"
                  data-row={rowIndex}
                  data-col={3}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 3 });
                  }}
                >
                  <select 
                    className={`px-2 py-1 rounded-md text-xs ${getStatusClass(task.status)} cursor-pointer border-none`}
                    onChange={(e) => {
                      console.log(`Changed status for task ${task.id} to:`, e.target.value);
                      updateTaskField(task.id, 'status', e.target.value);
                    }}
                    value={task.status}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="in-process">In-process</option>
                    <option value="need-to-start">Need to start</option>
                    <option value="complete">Complete</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              }
              
              {visibleColumns.includes('submitter') && 
                <div 
                  className="p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell"
                  data-row={rowIndex}
                  data-col={4}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 4 });
                  }}
                  onDoubleClick={() => {
                    const newValue = prompt('Enter submitter name:', task.submitter);
                    if (newValue !== null) {
                      console.log(`Edited submitter for task ${task.id}:`, newValue);
                      updateTaskField(task.id, 'submitter', newValue);
                    }
                  }}
                >
                  {task.submitter}
                </div>
              }
              
              {visibleColumns.includes('url') && 
                <div 
                  className="p-2 text-sm text-blue-600 underline border-r border-gray-200 cursor-cell"
                  data-row={rowIndex}
                  data-col={5}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 5 });
                  }}
                  onDoubleClick={() => {
                    const newValue = prompt('Enter URL:', task.url);
                    if (newValue !== null) {
                      console.log(`Edited URL for task ${task.id}:`, newValue);
                      updateTaskField(task.id, 'url', newValue);
                    }
                  }}
                >
                  {task.url}
                </div>
              }
              
              {visibleColumns.includes('assigned') && 
                <div 
                  className="p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell"
                  data-row={rowIndex}
                  data-col={6}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 6 });
                  }}
                  onDoubleClick={() => {
                    const newValue = prompt('Enter assignee name:', task.assigned);
                    if (newValue !== null) {
                      console.log(`Edited assignee for task ${task.id}:`, newValue);
                      updateTaskField(task.id, 'assigned', newValue);
                    }
                  }}
                >
                  {task.assigned}
                </div>
              }
              
              {visibleColumns.includes('priority') && 
                <div 
                  className="p-2 text-sm font-medium border-r border-gray-200"
                  data-row={rowIndex}
                  data-col={7}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 7 });
                  }}
                >
                  <select 
                    className={`bg-transparent border-none cursor-pointer ${getPriorityClass(task.priority)}`}
                    onChange={(e) => {
                      console.log(`Changed priority for task ${task.id} to:`, e.target.value);
                      updateTaskField(task.id, 'priority', e.target.value);
                    }}
                    value={task.priority}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              }
              
              {visibleColumns.includes('dueDate') && 
                <div 
                  className="p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell"
                  data-row={rowIndex}
                  data-col={8}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 8 });
                  }}
                  onDoubleClick={() => {
                    const newValue = prompt('Enter due date (DD-MM-YYYY):', task.dueDate);
                    if (newValue !== null) {
                      console.log(`Edited due date for task ${task.id}:`, newValue);
                      updateTaskField(task.id, 'dueDate', newValue);
                    }
                  }}
                >
                  {task.dueDate}
                </div>
              }
              
              {visibleColumns.includes('estValue') && 
                <div 
                  className="p-2 text-sm text-gray-600 text-right pr-4 cursor-cell"
                  data-row={rowIndex}
                  data-col={9}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCellSelect({ row: rowIndex, col: 9 });
                  }}
                  onDoubleClick={() => {
                    const newValue = prompt('Enter estimated value:', task.estValue);
                    if (newValue !== null) {
                      console.log(`Edited estimated value for task ${task.id}:`, newValue);
                      updateTaskField(task.id, 'estValue', newValue);
                    }
                  }}
                >
                  {task.estValue}
                </div>
              }
            </div>
          );
        })}
        
        {/* Empty rows for demonstration */}
        {Array.from({ length: 20 }).map((_, index) => {
          const rowIdx = mockTasks.length + index;
          return (
            <div 
              key={`empty-${index}`} 
              className="grid-table-row"
              data-row={rowIdx}
              onClick={() => handleCellSelect({ row: rowIdx, col: 0 })}
            >
            {visibleColumns.includes('id') && <div className="p-2 text-sm text-gray-600 border-r border-gray-200 w-8 sticky left-0 bg-white" data-row={rowIdx} data-col={0}>{mockTasks.length + index + 1}</div>}
            {visibleColumns.includes('jobRequest') && <div className="p-2 border-r border-gray-200 col-span-2" data-row={rowIdx} data-col={1}></div>}
            {visibleColumns.includes('submitted') && <div className="p-2 border-r border-gray-200" data-row={rowIdx} data-col={2}></div>}
            {visibleColumns.includes('status') && <div className="p-2 border-r border-gray-200" data-row={rowIdx} data-col={3}></div>}
            {visibleColumns.includes('submitter') && <div className="p-2 border-r border-gray-200" data-row={rowIdx} data-col={4}></div>}
            {visibleColumns.includes('url') && <div className="p-2 border-r border-gray-200" data-row={rowIdx} data-col={5}></div>}
            {visibleColumns.includes('assigned') && <div className="p-2 border-r border-gray-200" data-row={rowIdx} data-col={6}></div>}
            {visibleColumns.includes('priority') && <div className="p-2 border-r border-gray-200" data-row={rowIdx} data-col={7}></div>}
            {visibleColumns.includes('dueDate') && <div className="p-2 border-r border-gray-200" data-row={rowIdx} data-col={8}></div>}
            {visibleColumns.includes('estValue') && <div className="p-2" data-row={rowIdx} data-col={9}></div>}
          </div>
        );
      })}
      </div>

      {/* Tab navigation at the bottom */}
      <div className="border-t border-gray-200 bg-white p-2 flex">
        <div className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-800 mr-2">All Orders</div>
        <div className="text-gray-600 px-3 py-1 text-sm">Pending</div>
        <div className="text-gray-600 px-3 py-1 text-sm">Reviewed</div>
        <div className="text-gray-600 px-3 py-1 text-sm">Arrived</div>
        <div className="text-gray-400 px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetView;
