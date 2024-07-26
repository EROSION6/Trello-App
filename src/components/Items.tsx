import { TypeTask } from '@/types'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface TypeItemsProps {
	id: TypeTask['id']
	editTaskBody: boolean
	body: TypeTask['body']
	handleDeleteTask: (id: TypeTask['id']) => void
	setEditTaskBody: (value: boolean) => void
	handleKeyDownTask: (value: any) => void
	handleUpdateTaskBody: (id: string | number, body: string) => void
	handleDragTask: () => void
	handleDragStartTask: (task: TypeTask) => void
	handleDragOverTask: (
		e: React.DragEvent<HTMLDivElement>,
		task: TypeTask
	) => void
}

export const Items = ({
	id,
	body,
	handleDeleteTask,
	editTaskBody,
	setEditTaskBody,
	handleKeyDownTask,
	handleUpdateTaskBody,
	handleDragTask,
	handleDragStartTask,
	handleDragOverTask,
}: TypeItemsProps) => (
	<div
		className={`w-full h-28 bg-gray-950 rounded-xl flex items-center justify-between px-3 py-5 mt-2 cursor-grab ${'hover'}`}
		draggable
		onDragStart={() => handleDragStartTask({ id, body })}
		onDragOver={e => handleDragOverTask(e, { id, body })}
		onDrop={handleDragTask}
	>
		<p
			className='h-full text-white font-semibold'
			onClick={() => setEditTaskBody(true)}
		>
			{!editTaskBody && body}{' '}
			{editTaskBody && (
				<textarea
					value={body}
					autoFocus
					onBlur={() => setEditTaskBody(false)}
					className='w-full h-full bg-gray-950 rounded-xl outline-none px-2'
					onChange={e => handleUpdateTaskBody(id, e.target.value)}
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
)
