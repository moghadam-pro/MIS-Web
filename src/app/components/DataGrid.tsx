import React from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { cn } from '@/app/components/ui/utils';

export interface Column<T = any> {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'right' | 'center';
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

interface DataGridProps<T = any> {
  columns: Column<T>[];
  data: T[];
  keyField?: string;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  editable?: boolean;
  onCellEdit?: (rowIndex: number, columnKey: string, value: any) => void;
}

export const DataGrid = <T extends Record<string, any>>({
  columns,
  data,
  keyField = 'id',
  onRowClick,
  className,
  editable = false,
  onCellEdit,
}: DataGridProps<T>) => {
  const { isRTL } = useApp();

  const handleCellChange = (rowIndex: number, columnKey: string, value: any) => {
    if (onCellEdit) {
      onCellEdit(rowIndex, columnKey, value);
    }
  };

  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--grid-header-bg)] border-b border-[var(--grid-border)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    'px-4 py-3 text-sm font-semibold',
                    column.align === 'right' && 'text-right',
                    column.align === 'center' && 'text-center',
                    column.align === 'left' && 'text-left',
                    !column.align && (isRTL ? 'text-right' : 'text-left')
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row[keyField] || rowIndex}
                className={cn(
                  'border-b border-[var(--grid-border)] hover:bg-[var(--grid-hover)] transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td
                      key={column.key}
                      className={cn(
                        'px-4 py-3 text-sm',
                        column.align === 'right' && 'text-right',
                        column.align === 'center' && 'text-center',
                        column.align === 'left' && 'text-left',
                        !column.align && (isRTL ? 'text-right' : 'text-left')
                      )}
                    >
                      {column.render ? (
                        column.render(value, row, rowIndex)
                      ) : editable ? (
                        <input
                          type="text"
                          value={value || ''}
                          onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
                          className="w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1"
                        />
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
