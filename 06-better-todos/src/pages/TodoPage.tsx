import { useParams } from "react-router-dom";

const TodoPage = () => {
	const { id } = useParams();

	return (
		<div>Todo ID {id}</div>
	)
}

export default TodoPage;
