import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { BREEDS, getRandomCatImage } from "../services/TheCatAPI";
import CatSpinner from "../components/CatSpinner";

const RandomCatPage = () => {
	const [breed, setBreed] = useState("");  // ragd, sibe, beng, pers, norw, sphy

	const {
		data,
		error,
		isError,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ["random-cat", breed],
		queryFn: () => getRandomCatImage(breed),
	});

	return (
		<>
			<h1>I ❤️ Random Cats</h1>

			<p>A cats behaviour is random so here's a random cat for you! Such random, very catlike, much hairball</p>

			{isFetching && <CatSpinner />}

			{isError && (
				<Alert variant="warning">
					{error.message}
				</Alert>
			)}

			<div className="mb-3">
				<Button
					onClick={() => refetch()}
					variant="primary"
				>
					MJAU CATS!!
				</Button>
			</div>

			<Form.Select
				aria-label="Select cat breed"
				className="mb-3"
				onChange={e => setBreed(e.target.value)}
			>
				<option value="">Any</option>
				{BREEDS.map(breed => (
					<option key={breed.id} value={breed.id}>{breed.name}</option>
				))}
			</Form.Select>

			{data && (
				<div className="d-flex justify-content-center">
					<Image src={data.url} fluid />
				</div>
			)}
		</>
	)
}

export default RandomCatPage;
