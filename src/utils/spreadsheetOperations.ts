// Clipboard operations
export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text).catch(err => {
    console.error('Could not copy text to clipboard:', err);
  });
};

// Cell addressing (A1, B2 style)
export const getCellAddress = (row: number, col: number): string => {
  const colLetter = String.fromCharCode(65 + col); // A, B, C, ...
  const rowNumber = row + 1; // 1-indexed
  return `${colLetter}${rowNumber}`;
};

// Cell range addressing
export const getCellRange = (startRow: number, startCol: number, endRow: number, endCol: number): string => {
  return `${getCellAddress(startRow, startCol)}:${getCellAddress(endRow, endCol)}`;
};

// Sort helpers
export const sortRows = <T extends Record<string, any>>(
  rows: T[],
  key: keyof T,
  direction: 'asc' | 'desc'
): T[] => {
  return [...rows].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    
    // Handle different data types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    // Convert to string for mixed types
    const aStr = String(aValue);
    const bStr = String(bValue);
    
    return direction === 'asc' 
      ? aStr.localeCompare(bStr) 
      : bStr.localeCompare(aStr);
  });
};

// Date formatting
export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Number formatting
export const formatNumber = (value: number, options: Intl.NumberFormatOptions = {}): string => {
  return new Intl.NumberFormat('en-US', options).format(value);
};

// Currency formatting
export const formatCurrency = (value: number, currency = 'USD'): string => {
  return formatNumber(value, {
    style: 'currency',
    currency
  });
};

// Parse cell value based on type
export const parseCellValue = (value: string): string | number | Date => {
  // Check if it's a number
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value);
  }
  
  // Check if it's a date (DD-MM-YYYY format)
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [day, month, year] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  
  // Default to string
  return value;
};
