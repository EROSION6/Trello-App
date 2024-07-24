import { CirclePlus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import '@/styles/index.css';
import { ScrollArea } from './ui/scroll-area';
import { TypeColumn, TypeTask } from '@/types';
import { useState } from 'react';
import { Items } from './Items';

interface TypeCardProps {
  col: TypeColumn[];
  id: TypeColumn['id'];
  body: TypeColumn['body'];
  handleDeleteColumn: (id: TypeColumn['id']) => void;
  handleUpdateTitle: (id: number | string, body: string) => void;
}

export const Card = ({
  id,
  body,
  handleDeleteColumn,
  handleUpdateTitle,
}: TypeCardProps) => {
  const [task, setTask] = useState<TypeTask[]>([]);
  const [editBody, setEditBody] = useState(false);
  const [editTaskBody, setEditTaskBody] = useState(false);

  // KeyDown Column
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditBody(false);
    }
  };

  // Create task
  const handleAddTask = () => {
    const object = {
      id: Math.floor(Math.random() * 1000),
      body: 'Content...',
    };
    body === '' ? alert('Write title') : setTask([...task, object]);
  };

  // Delete task
  const handleDeleteTask = (id: TypeTask['id']) => {
    setTask(task.filter((t) => t.id !== id));
  };

  // KeyDown Task
  const handleKeyDownTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditBody(false);
    }
  };

  // Ipdate body name
  const handleUpdateTaskBody = (id: number | string, body: string) => {
    setTask(
      task.map((t) => {
        if (t.id === id) return { ...t, body };
        return t;
      })
    );
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
                  className="w-full bg-gray-950 rounded-md outline-none px-2"
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
          {task.length > 0 ? (
            task.map((t) => (
              <Items
                key={t.id}
                {...t}
                handleDeleteTask={handleDeleteTask}
                editTaskBody={editTaskBody}
                setEditTaskBody={setEditTaskBody}
                handleKeyDownTask={handleKeyDownTask}
                handleUpdateTaskBody={handleUpdateTaskBody}
              />
            ))
          ) : (
            <h1 className="text-2xl font-semibold text-white m-3">
              Create task&#129402;
            </h1>
          )}
        </ScrollArea>
      </div>
      {/* Footer */}
      <footer className="w-full cursor-pointer my-4 mx-3">
        <button
          className="w-full bg-transparent flex items-center gap-x-2 text-xl text-white font-semibold"
          onClick={handleAddTask}
        >
          <CirclePlus /> Add task
        </button>
      </footer>
    </div>
  );
};
