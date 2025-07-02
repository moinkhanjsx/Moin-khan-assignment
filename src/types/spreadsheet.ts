export interface CellData {
  id: string;
  value: string | number;
  isEditable?: boolean;
  isSelected?: boolean;
  row: number;
  col: number;
}

export interface RowData {
  id: string;
  index: number;
  cells: CellData[];
}

export interface ColumnData {
  id: string;
  title: string;
  width: number;
  isVisible: boolean;
}

export interface SpreadsheetData {
  columns: ColumnData[];
  rows: RowData[];
  selectedCell: { row: number; col: number } | null;
}

export interface CellPosition {
  row: number;
  col: number;
}

export type CellSelectionHandler = (position: CellPosition) => void;
export type CellChangeHandler = (row: number, col: number, value: string | number) => void;