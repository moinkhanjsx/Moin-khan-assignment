import React from 'react';

interface ColumnVisibilityMenuProps {
  columns: string[];
  visibleColumns: string[];
  onToggleColumn: (column: string) => void;
  onClose: () => void;
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

const ColumnVisibilityMenu: React.FC<ColumnVisibilityMenuProps> = ({ 
  columns, 
  visibleColumns, 
  onToggleColumn,
  onClose
}) => {
  return (
    <div className="absolute top-10 left-0 z-10 bg-white shadow-lg rounded-md border border-gray-200 p-3 min-w-[200px]">
      <div className="flex justify-between items-center mb-2 border-b pb-2">
        <h3 className="font-medium text-gray-700">Column Visibility</h3>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {columns.map(column => (
          <div key={column} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`col-${column}`}
              checked={visibleColumns.includes(column)}
              onChange={() => onToggleColumn(column)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`col-${column}`} className="text-sm text-gray-700">
              {columnLabels[column] || column}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnVisibilityMenu;
