import React, { useRef, useEffect, useState } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onCut: () => void;
  onDelete: () => void;
  onInsertRow: () => void;
  onInsertColumn: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onCopy,
  onPaste,
  onCut,
  onDelete,
  onInsertRow,
  onInsertColumn,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  // Adjust position if menu would go out of viewport
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = x;
      let adjustedY = y;
      
      if (x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 5;
      }
      
      if (y + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 5;
      }
      
      setPosition({ x: adjustedX, y: adjustedY });
    }
  }, [x, y]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const menuItemClass = "px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer flex items-center gap-2";
  
  return (
    <div 
      ref={menuRef}
      className="absolute bg-white shadow-lg border border-gray-200 rounded-md z-50 min-w-[180px]"
      style={{ top: position.y, left: position.x }}
    >
      <div className={menuItemClass} onClick={onCopy}>
        <span className="text-gray-500">⌘C</span>
        <span>Copy</span>
      </div>
      <div className={menuItemClass} onClick={onCut}>
        <span className="text-gray-500">⌘X</span>
        <span>Cut</span>
      </div>
      <div className={menuItemClass} onClick={onPaste}>
        <span className="text-gray-500">⌘V</span>
        <span>Paste</span>
      </div>
      <div className="border-b border-gray-200 my-1"></div>
      <div className={menuItemClass} onClick={onDelete}>
        <span className="text-gray-500">Del</span>
        <span>Delete</span>
      </div>
      <div className="border-b border-gray-200 my-1"></div>
      <div className={menuItemClass} onClick={onInsertRow}>
        <span>Insert row</span>
      </div>
      <div className={menuItemClass} onClick={onInsertColumn}>
        <span>Insert column</span>
      </div>
    </div>
  );
};

export default ContextMenu;
