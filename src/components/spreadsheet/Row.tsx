import React from 'react';
import Cell from './Cell';
import { RowData, CellPosition } from '../../types/spreadsheet';

interface RowProps {
  rowData: RowData;
  rowIndex: number;
  selectedCell: CellPosition | null;
  onCellChange: (row: number, col: number, value: string | number) => void;
  onCellSelect: (position: CellPosition) => void;
}

const Row: React.FC<RowProps> = ({ 
  rowData, 
  rowIndex, 
  selectedCell, 
  onCellChange, 
  onCellSelect 
}) => {
  return (
    <div className="flex" role="row">
      {/* Row header/index */}
      <div 
        className="flex items-center justify-center w-10 bg-gray-100 border border-gray-200 text-gray-600 font-medium"
        role="rowheader"
      >
        {rowIndex + 1}
      </div>
      
      {/* Row cells */}
      {rowData.cells.map((cell, colIndex) => (
        <Cell
          key={cell.id}
          data={cell}
          isSelected={!!(selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex)}
          onChange={(value) => onCellChange(rowIndex, colIndex, value)}
          onSelect={() => onCellSelect({ row: rowIndex, col: colIndex })}
        />
      ))}
    </div>
  );
};

export default Row;