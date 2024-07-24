import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { TypeTask } from '@/types';

interface TypeItemsProps {
  id: TypeTask['id'];
  editTaskBody: boolean;
  body: TypeTask['body'];
  handleDeleteTask: (id: TypeTask['id']) => void;
  setEditTaskBody: (value: boolean) => void;
  handleKeyDownTask: (value: any) => void;
  handleUpdateTaskBody: (id: string | number, body: string) => void;
}

export const Items = ({
  id,
  body,
  handleDeleteTask,
  editTaskBody,
  setEditTaskBody,
  handleKeyDownTask,
  handleUpdateTaskBody,
}: TypeItemsProps) => (
  <div
    className={`w-full h-28 bg-gray-950 rounded-xl flex items-center justify-between px-3 py-5 mt-2 cursor-pointer ${'hover'}`}
  >
    <p
      className="h-full text-white font-semibold"
      onClick={() => setEditTaskBody(true)}
    >
      {!editTaskBody && body}{' '}
      {editTaskBody && (
        <input
          type="text"
          value={body}
          autoFocus
          onBlur={() => setEditTaskBody(false)}
          className="w-full h-auto bg-gray-950 rounded-xl outline-none px-2"
          onChange={(e) => handleUpdateTaskBody(id, e.target.value)}
          onKeyDown={handleKeyDownTask}
        />
      )}
    </p>
    <Button
      size={'sm'}
      variant={'destructive'}
      onClick={() => handleDeleteTask(id)}
    >
      <Trash2 size={23} />
    </Button>
  </div>
);
