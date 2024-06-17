import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/AutoDismissingAlert";
import useStatusLocation from "../hooks/useStatusLocation";
import { Todo } from "../types/Todo.types";

const todo: Todo = {
	id: "Xi6VigUyelerlFbSHKTZ",
	title: "Learn to fake better data 😅",
	completed: true,
};

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const location = useStatusLocation();

	return (
		<>
			<h1 title={`Todo #${todo.id}`}>{todo.title}</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={1000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? (
					<span className="completed">Completed</span>
				) : (
					<span className="not-completed">Not completed</span>
				)}
			</p>

			<div className="buttons mb-3">
				<Button onClick={() => console.log("Would toggle todo")} variant="success">
					Toggle
				</Button>

				<Link to={`/todos/${todoId}/edit`} className="btn btn-warning" role="button">
					Edit
				</Link>

				<Button onClick={() => setShowDeleteModal(true)} variant="danger">
					Delete
				</Button>
			</div>

			<ConfirmationModal
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={() => console.log("Would delete todo with id:", todoId)}
				show={showDeleteModal}
				title="Confirm delete"
				variant="danger"
			>
				Delete todo "{todo.title}"?
			</ConfirmationModal>

			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	);
};

export default TodoPage;
