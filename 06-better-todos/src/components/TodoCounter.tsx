import React from 'react'

interface TodoCounterProps {
	finished: number;
	total: number;
}

const TodoCounter: React.FC<TodoCounterProps> = ({ total, finished }) => {
	return (
		<p className="mt-3 text-muted">
			{finished} out of {total} todos completed.
		</p>
	)
}

export default TodoCounter
