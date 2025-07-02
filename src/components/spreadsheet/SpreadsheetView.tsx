import React, { useEffect, useRef, useState } from 'react';
import { useSpreadsheet } from '../../hooks/useSpreadsheet';
import SpreadsheetHeader from './SpreadsheetHeader';
import Row from './Row';

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
    columns, 
    data, 
    selectedCell, 
    handleCellSelect, 
    handleCellChange, 
    handleKeyNavigation, 
    toggleColumnVisibility, 
    resizeColumn 
  } = useSpreadsheet();
  
  const spreadsheetRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('q3-overview');
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

  // Add keyboard event listeners for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle key events when the spreadsheet is focused or a cell is selected
      if (document.activeElement === spreadsheetRef.current || 
          (document.activeElement && document.activeElement.closest('.spreadsheet-container'))) {
        handleKeyNavigation(e as any);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyNavigation]);

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

  return (
    <div 
      className="spreadsheet-container bg-white border border-gray-300 overflow-auto mt-0 mx-auto w-full shadow-lg" 
      ref={spreadsheetRef}
      tabIndex={0} // Make the container focusable
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
      
      {/* Table Header */}
      <div className="grid grid-cols-10 bg-gray-50 border-b border-gray-200">
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200 w-8">#</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200 col-span-2">Job Request</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200">Submitted</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200">Status</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200">Submitter</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200">URL</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200">Assigned</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200">Priority</div>
        <div className="p-2 text-xs font-medium text-gray-700 border-r border-gray-200">Due Date</div>
        <div className="p-2 text-xs font-medium text-gray-700">Est. Value</div>
      </div>
      
      {/* Table Rows */}
      <div className="spreadsheet-body">
        {mockTasks.map((task) => {
          const isSelected = selectedCell && selectedCell.row === task.id - 1;
          
          return (
            <div 
              key={task.id} 
              className={`grid grid-cols-10 border-b border-gray-200 hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
              onClick={() => handleCellSelect({ row: task.id - 1, col: 0 })}
              tabIndex={0}
              onKeyDown={(e) => handleKeyNavigation(e as any)}
            >
              <div className="p-2 text-sm text-gray-600 border-r border-gray-200 w-8">{task.id}</div>
              <div 
                className="p-2 text-sm text-gray-800 border-r border-gray-200 col-span-2 cursor-cell"
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
              <div 
                className="p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell"
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
              <div className="p-2 text-sm border-r border-gray-200">
                <select 
                  className={`px-2 py-1 rounded-md text-xs ${getStatusClass(task.status)} cursor-pointer border-none`}
                  onChange={(e) => {
                    console.log(`Changed status for task ${task.id} to:`, e.target.value);
                    updateTaskField(task.id, 'status', e.target.value);
                  }}
                  value={task.status}
                >
                  <option value="in-process">In-process</option>
                  <option value="need-to-start">Need to start</option>
                  <option value="complete">Complete</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <div 
                className="p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell"
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
              <div 
                className="p-2 text-sm text-blue-600 underline border-r border-gray-200 cursor-cell"
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
              <div 
                className="p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell"
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
              <div className="p-2 text-sm font-medium border-r border-gray-200">
                <select 
                  className={`bg-transparent border-none cursor-pointer ${getPriorityClass(task.priority)}`}
                  onChange={(e) => {
                    console.log(`Changed priority for task ${task.id} to:`, e.target.value);
                    updateTaskField(task.id, 'priority', e.target.value);
                  }}
                  value={task.priority}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div 
                className="p-2 text-sm text-gray-600 border-r border-gray-200 cursor-cell"
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
              <div 
                className="p-2 text-sm text-gray-600 text-right pr-4 cursor-cell"
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
            </div>
          );
        })}
        
        {/* Empty rows for demonstration */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={`empty-${index}`} className="grid grid-cols-10 border-b border-gray-200">
            <div className="p-2 text-sm text-gray-600 border-r border-gray-200 w-8">{mockTasks.length + index + 1}</div>
            {Array.from({ length: 9 }).map((_, colIndex) => (
              <div 
                key={`empty-cell-${index}-${colIndex}`} 
                className={`p-2 border-r border-gray-200 ${colIndex === 1 ? 'col-span-2' : ''} ${colIndex === 8 ? 'border-r-0' : ''}`}
              ></div>
            ))}
          </div>
        ))}
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