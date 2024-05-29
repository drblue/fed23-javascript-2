import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import { getRandomCatImage } from "../services/TheCatAPI";
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

				<ButtonGroup className="ms-2">
					<Button variant="secondary" onClick={() => setBreed("")}>Any</Button>
					<Button variant="secondary" onClick={() => setBreed("ragd")}>Ragdoll</Button>
					<Button variant="secondary" onClick={() => setBreed("sibe")}>Siberian</Button>
					<Button variant="secondary" onClick={() => setBreed("beng")}>Bengal</Button>
					<Button variant="secondary" onClick={() => setBreed("pers")}>Persian</Button>
					<Button variant="secondary" onClick={() => setBreed("norw")}>Norwegian</Button>
					<Button variant="secondary" onClick={() => setBreed("sphy")}>Sphynx</Button>
				</ButtonGroup>
			</div>

			{data && (
				<div className="d-flex justify-content-center">
					<Image src={data.url} fluid />
				</div>
			)}
		</>
	)
}

export default RandomCatPage;
