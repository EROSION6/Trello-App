import { CirclePlus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import '@/styles/index.css';
import { ScrollArea } from './ui/scroll-area';
import { taskData } from '@/data';
import { TypeColumn } from '@/types';
import { useState } from 'react';

interface TypeItemsProps {
  body: TypeColumn['body'];
}

interface TypeCardProps {
  col: TypeColumn[];
  id: TypeColumn['id'];
  body: TypeColumn['body'];
  handleDeleteColumn: (id: TypeColumn['id']) => void;
  handleUpdateTitle: (id: number | string, body: string) => void;
}

export const Card = ({
  id,
  col,
  body,
  handleDeleteColumn,
  handleUpdateTitle,
}: TypeCardProps) => {
  const [task, setTask] = useState(taskData);
  const [editBody, setEditBody] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditBody(false);
    }
  };
  return (
    <div className="w-[26rem] h-2/3 bg-gray-900 rounded-xl p-1 flex flex-col justify-between">
      {/* Menu  */}
      <div>
        <div className="w-full h-auto bg-gray-950 rounded-tr-xl rounded-tl-xl flex justify-between p-3">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
              {task.length}
            </span>
            <h1
              className="text-xl text-white font-semibold"
              onClick={() => setEditBody(true)}
            >
              {!editBody && body}
              {editBody && (
                <input
                  type="text"
                  value={body}
                  autoFocus
                  onBlur={() => setEditBody(false)}
                  className="w-full bg-gray-950 rounded-xl outline-none px-2"
                  onChange={(e) => handleUpdateTitle(id, e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}
            </h1>
          </div>
          <Button
            size={'sm'}
            variant={'destructive'}
            onClick={() => handleDeleteColumn(id)}
          >
            <Trash2 size={23} />
          </Button>
        </div>
        {/* Card */}
        <ScrollArea className="h-[32rem]">
          {taskData.map((task) => (
            <Items key={task.id} {...task} />
          ))}
        </ScrollArea>
      </div>
      {/* Footer */}
      <footer className="w-full cursor-pointer my-4 mx-3">
        <button className="w-full bg-transparent flex items-center gap-x-2 text-xl text-white font-semibold">
          <CirclePlus /> Add task
        </button>
      </footer>
    </div>
  );
};

const Items = ({ body }: TypeItemsProps) => (
  <div
    className={`w-full h-28 bg-gray-950 rounded-xl flex items-center justify-between px-3 py-5 mt-2 cursor-pointer ${'hover'}`}
  >
    <p className="h-full text-white font-semibold">{body}</p>
    <Button size={'sm'} variant={'destructive'}>
      <Trash2 size={23} />
    </Button>
  </div>
);
