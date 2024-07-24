import { CirclePlus } from 'lucide-react';
import { Card } from './Card';
import '@/styles/index.css';
import { useState } from 'react';
import { TypeColumn } from '@/types';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export const KonbanBoard = () => {
  const [column, setColumn] = useState<TypeColumn[]>([
    { id: 12333, body: 'Column 1' },
  ]);

  // Create Column
  const handleAddColumn = () => {
    const object = {
      id: Math.floor(Math.random() * 1000),
      body: `column ${column.length + 1}`,
    };
    setColumn([...column, object]);
  };

  // Delete Column
  const handleDeleteColumn = (id: TypeColumn['id']) => {
    setColumn(column.filter((col) => col.id !== id));
  };

  // Chnage title column
  const handleUpdateTitle = (id: number | string, body: string) => {
    setColumn(
      column.map((col) => {
        if (col.id !== id) return col;
        return { ...col, body };
      })
    );
  };

  return (
    <div className="w-full h-screen bg-gray-950 flex items-center pl-16">
      <ScrollArea>
        <div className="flex items-start space-x-5 mb-5">
          {column.map((col) => (
            <Card
              key={col.id}
              {...col}
              col={column}
              handleDeleteColumn={handleDeleteColumn}
              handleUpdateTitle={handleUpdateTitle}
            />
          ))}
          {/* Create Column */}
          <div className="w-80 h-16 bg-gray-900 rounded-xl flex items-center p-1">
            <div
              className={`w-full h-full flex items-center bg-gray-950 rounded-xl ${'hover'} `}
            >
              <button
                className="w-full bg-transparent flex items-center gap-x-2 text-lg text-white font-semibold px-4"
                onClick={handleAddColumn}
              >
                <CirclePlus /> Add Column
              </button>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
