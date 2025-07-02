import { ColumnData, RowData } from '../types/spreadsheet';

// Generate column headers (A, B, C, ..., Z, AA, AB, ...)
export const generateColumnLabel = (index: number): string => {
  let columnLabel = '';
  let dividend = index + 1;
  let modulo;

  while (dividend > 0) {
    modulo = (dividend - 1) % 26;
    columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnLabel;
};

// Generate column configuration
export const generateColumns = (count: number): ColumnData[] => {
  return Array(count)
    .fill(0)
    .map((_, index) => ({
      id: `col-${index}`,
      title: generateColumnLabel(index),
      width: 100, // Default width
      isVisible: true
    }));
};

// Generate empty spreadsheet data
export const generateEmptyData = (rowCount: number, colCount: number): RowData[] => {
  return Array(rowCount)
    .fill(0)
    .map((_, rowIndex) => ({
      id: `row-${rowIndex}`,
      index: rowIndex,
      cells: Array(colCount)
        .fill(0)
        .map((_, colIndex) => ({
          id: `cell-${rowIndex}-${colIndex}`,
          value: '',
          row: rowIndex,
          col: colIndex,
          isEditable: true
        }))
    }));
};

export const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) {
        return '';
    }
    
    if (typeof value === 'number') {
        // Format numbers with commas for thousands
        return new Intl.NumberFormat().format(value);
    }
    
    return value.toString();
};

export const validateCellValue = (value: any): boolean => {
    // Example validation: only allow strings or numbers
    return typeof value === 'string' || typeof value === 'number';
};

export const parseCellValue = (value: string): any => {
    // Example parsing: try to convert to a number if possible
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? value : parsedValue;
};