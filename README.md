# Spreadsheet Prototype

This project is a static front-end prototype of a spreadsheet application built using React, TypeScript, and Tailwind CSS. The goal is to visually match the provided Figma design for a spreadsheet view, creating a Google Sheets/Excel-like experience.

## Live Demo

[View the live demo here](https://moinkhanjsx.github.io/spreadsheet-prototype-dist/public)

## Features

- Excel/Google Sheets-like UI and interactions
- Cell editing with double-click and state persistence
- Dropdown selects for status and priority fields
- Visual styling for status (color-coded pills) and priority
- Column visibility toggle UI with dropdown menu
- Column resizing with drag handles
- Keyboard navigation (arrow keys, tab)
- Interactive UI elements that log to console:
  - Toolbar buttons (Import, Export, Share, New Action)
  - Filter/Sort/Hide Fields buttons
  - Cell edits (values are both logged and persisted in state)
  - Column visibility toggles
  - Column resizing
- Responsive design that adapts to different screen sizes
- Clean and modern UI using Tailwind CSS for styling

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spreadsheet-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application (or the port shown in the console output).

## Technologies Used

- **React 18**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript (using strict mode)
- **Tailwind CSS**: A utility-first CSS framework for styling
- **Vite**: A build tool that provides a fast development environment

## Implementation Details

### Component Structure

- **SpreadsheetView**: The main container component
- **SpreadsheetHeader**: Handles column headers, resizing, and visibility
- **Row**: Renders a row of cells with a row index
- **Cell**: Individual cell component with editing capabilities
- **Header**: Application header with toolbar and navigation
- **Button/Input**: Common UI components

### State Management

- Used React's built-in state management (useState, useEffect, useCallback)
- Custom hook `useSpreadsheet` to manage spreadsheet data and interactions
- Cell edits are persisted in component state

## Usage Instructions

- **Cell Editing**: Double-click on a cell to edit
- **Status/Priority**: Use the dropdown selects to change status and priority
- **Navigation**: Use arrow keys to navigate between cells
- **UI Interactions**: All buttons and interactive elements log to the console

## Trade-offs and Decisions

- Implemented a custom spreadsheet rather than using a full-featured library for better control over styling and interactions
- Focused on core spreadsheet features while maintaining visual fidelity to the Figma design
- Used a flat data structure for easy updates and rendering
- Implemented the stretch goal of keyboard navigation
- Prioritized visual appearance and interactive elements over complex spreadsheet functionality

## Future Improvements

- Formula support with calculation engine
- Cell formatting options (text alignment, colors, etc.)
- Undo/Redo functionality
- Data persistence using localStorage or a backend service
- CSV/Excel import/export functionality
- Cell range selection
- Virtual scrolling for large datasets
