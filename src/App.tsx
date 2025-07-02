import React from 'react';
import { Header } from './components/layout';
import { SpreadsheetView } from './components/spreadsheet';

const App: React.FC = () => {
  return (
    <div className="App bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SpreadsheetView />
      </main>
    </div>
  );
};

export default App;