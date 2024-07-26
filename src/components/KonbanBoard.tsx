import { fakeColumn } from '@/data'
import '@/styles/index.css'
import { TypeColumn } from '@/types'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { Card } from './Card'
import { Search } from './Search'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export const KonbanBoard = () => {
	const [column, setColumn] = useState<TypeColumn[]>(fakeColumn)
	const [search, setSearch] = useState('')
	const [draggingColumn, setDraggingColumn] = useState<null | TypeColumn>(null)
	const [targetColumn, setTargetColumn] = useState<null | TypeColumn>(null)

	const handleDragStart = (col: TypeColumn) => {
		setDraggingColumn(col)
	}

	const handleDragOver = (
		e: React.DragEvent<HTMLDivElement>,
		col: TypeColumn
	) => {
		e.preventDefault()
		setTargetColumn(col)
	}

	const handleDrop = () => {
		if (draggingColumn && targetColumn) {
			const newColumns = column.map(col => {
				if (col.id === draggingColumn.id) {
					return targetColumn
				} else if (col.id === targetColumn.id) {
					return draggingColumn
				}
				return col
			})

			setColumn(newColumns)
		}
		setDraggingColumn(null)
		setTargetColumn(null)
	}

	// Create Column
	const handleAddColumn = () => {
		const object = {
			id: Math.floor(Math.random() * 1000),
			body: `column ${column.length + 1}`,
			task: [],
		}
		setColumn([...column, object])
	}

	// Delete Column
	const handleDeleteColumn = (id: TypeColumn['id']) => {
		setColumn(column.filter(col => col.id !== id))
	}

	// Column Filtering
	const filterColumn = column.filter(col =>
		col.body.toLowerCase().includes(search.toLowerCase())
	)

	// Change title column
	const handleUpdateTitle = (id: number | string, body: string) => {
		setColumn(
			column.map(col => {
				if (col.id === id) return { ...col, body }
				return col
			})
		)
	}

	return (
		<div className='w-full h-screen bg-gray-950 flex flex-col justify-evenly pl-16'>
			<Search search={search} setSearch={setSearch} />
			<ScrollArea>
				<div className='flex items-start space-x-5 mb-5'>
					{filterColumn.map(col => (
						<Card
							key={col.id}
							{...col}
							column={column}
							handleDeleteColumn={handleDeleteColumn}
							handleUpdateTitle={handleUpdateTitle}
							handleDragStart={handleDragStart}
							handleDragOver={handleDragOver}
							handleDrop={handleDrop}
						/>
					))}
					{/* Create Column */}
					<div className='w-80 h-16 bg-gray-900 rounded-xl flex items-center p-1'>
						<div className='w-full h-full flex items-center bg-gray-950 rounded-xl hover'>
							<button
								className='w-full bg-transparent flex items-center gap-x-2 text-lg text-white font-semibold px-4'
								onClick={handleAddColumn}
							>
								<CirclePlus /> Add Column
							</button>
						</div>
					</div>
				</div>
				<ScrollBar orientation='horizontal' />
			</ScrollArea>
		</div>
	)
}
