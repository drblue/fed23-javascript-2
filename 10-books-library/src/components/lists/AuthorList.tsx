import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Author } from "../../services/BooksAPI.types";

interface AuthorListProps {
	authors: Author[];
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
	if (!authors.length) {
		return <p>No authors for you!</p>;
	}

	return (
		<ListGroup>
			{authors.map((author) => (
				<ListGroup.Item action as={Link} key={author.id} to={`/authors/${author.id}`}>
					<div>{author.name}</div>
					<div className="text-small text-muted">Born: {author.date_of_birth}</div>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default AuthorList;
