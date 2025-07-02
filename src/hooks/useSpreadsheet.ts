import { useState, useEffect, useCallback } from 'react';
import { CellData, RowData, ColumnData, CellPosition, SpreadsheetData } from '../types/spreadsheet';
import { generateColumns, generateEmptyData } from '../utils/spreadsheet';

export const useSpreadsheet = () => {
    // Initial columns setup
    const [columns, setColumns] = useState<ColumnData[]>(generateColumns(26)); // A-Z
    const [data, setData] = useState<RowData[]>([]);
    const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
    
    // Initialize data with empty cells
    useEffect(() => {
        const initialData = generateEmptyData(20, columns.length);
        setData(initialData);
    }, [columns.length]);

    // Handle cell selection
    const handleCellSelect = useCallback((position: CellPosition) => {
        setSelectedCell(position);
    }, []);

    // Handle cell value change
    const handleCellChange = useCallback((row: number, col: number, value: string | number) => {
        setData(prevData => {
            const newData = [...prevData];
            if (newData[row] && newData[row].cells[col]) {
                newData[row].cells[col] = {
                    ...newData[row].cells[col],
                    value
                };
            }
            return newData;
        });
    }, []);

    // Handle keyboard navigation
    const handleKeyNavigation = useCallback((e: any) => {
        if (!selectedCell) return;

        const { row, col } = selectedCell;
        let newRow = row;
        let newCol = col;

        switch (e.key) {
            case 'ArrowUp':
                newRow = Math.max(0, row - 1);
                break;
            case 'ArrowDown':
                newRow = Math.min(data.length - 1, row + 1);
                break;
            case 'ArrowLeft':
                newCol = Math.max(0, col - 1);
                break;
            case 'ArrowRight':
                newCol = Math.min(columns.length - 1, col + 1);
                break;
            case 'Tab':
                e.preventDefault();
                if (e.shiftKey) {
                    // Move to previous cell or previous row's last cell
                    if (col > 0) {
                        newCol = col - 1;
                    } else if (row > 0) {
                        newRow = row - 1;
                        newCol = columns.length - 1;
                    }
                } else {
                    // Move to next cell or next row's first cell
                    if (col < columns.length - 1) {
                        newCol = col + 1;
                    } else if (row < data.length - 1) {
                        newRow = row + 1;
                        newCol = 0;
                    }
                }
                break;
            default:
                return;
        }

        if (newRow !== row || newCol !== col) {
            setSelectedCell({ row: newRow, col: newCol });
        }
    }, [selectedCell, data.length, columns.length]);

    // Toggle column visibility
    const toggleColumnVisibility = useCallback((columnId: string) => {
        setColumns(prevColumns => 
            prevColumns.map(col => 
                col.id === columnId ? { ...col, isVisible: !col.isVisible } : col
            )
        );
    }, []);

    // Resize column width
    const resizeColumn = useCallback((columnId: string, newWidth: number) => {
        setColumns(prevColumns => 
            prevColumns.map(col => 
                col.id === columnId ? { ...col, width: newWidth } : col
            )
        );
    }, []);

    return {
        columns: columns.filter(col => col.isVisible),
        data,
        selectedCell,
        handleCellSelect,
        handleCellChange,
        handleKeyNavigation,
        toggleColumnVisibility,
        resizeColumn
    };
};

export default useSpreadsheet;