import React from 'react';

const Header: React.FC = () => {
    return (
        <div>
            {/* Warning banner */}
            <div className="bg-amber-100 text-amber-800 px-4 py-2 text-sm">
                Please Duplicate this file and use as needed | We will NOT be giving edit access to this sheet directly.
            </div>
            
            {/* Main header */}
            <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                {/* Left side - Workspace navigation */}
                <div className="flex items-center space-x-2">
                    <div className="bg-green-100 text-green-700 w-6 h-6 flex items-center justify-center rounded">
                        <span className="text-xs">S</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <span>Workspace</span>
                        <span className="mx-1">•</span>
                        <span>Folder 2</span>
                        <span className="mx-1">•</span>
                        <span className="font-medium">Spreadsheet 3</span>
                    </div>
                </div>
                
                {/* Right side - Search, notifications, user */}
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search within sheet"
                            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1 text-sm w-56"
                        />
                        <div className="absolute right-2 top-1.5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        3
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs">JD</span>
                    </div>
                </div>
            </header>

            {/* Tool bar */}
            <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-600 text-sm">
                        <span>Tool bar</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button 
                            className="flex items-center space-x-1 text-gray-600 text-sm border border-gray-300 rounded px-2 py-1"
                            onClick={() => console.log('Hide fields button clicked')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                            <span>Hide fields</span>
                        </button>
                        
                        <button 
                            className="flex items-center space-x-1 text-gray-600 text-sm border border-gray-300 rounded px-2 py-1"
                            onClick={() => console.log('Sort button clicked')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"></path>
                            </svg>
                            <span>Sort</span>
                        </button>
                        
                        <button 
                            className="flex items-center space-x-1 text-gray-600 text-sm border border-gray-300 rounded px-2 py-1"
                            onClick={() => console.log('Filter button clicked')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                            <span>Filter</span>
                        </button>
                        
                        <button 
                            className="flex items-center space-x-1 text-gray-600 text-sm border border-gray-300 rounded px-2 py-1"
                            onClick={() => console.log('Call view button clicked')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            <span>Call view</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button 
                        className="flex items-center space-x-1 text-gray-600 text-sm border border-gray-300 rounded px-3 py-1"
                        onClick={() => console.log('Import button clicked')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>Import</span>
                    </button>
                    
                    <button 
                        className="flex items-center space-x-1 text-gray-600 text-sm border border-gray-300 rounded px-3 py-1"
                        onClick={() => console.log('Export button clicked')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>Export</span>
                    </button>
                    
                    <button 
                        className="flex items-center space-x-1 text-gray-600 text-sm border border-gray-300 rounded px-3 py-1"
                        onClick={() => console.log('Share button clicked')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        <span>Share</span>
                    </button>
                    
                    <button 
                        className="flex items-center space-x-1 bg-green-700 text-white text-sm rounded px-3 py-1"
                        onClick={() => console.log('New Action button clicked')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>New Action</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;