import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getRandomCatImage } from "../services/TheCatAPI";
import CatSpinner from "../components/CatSpinner";

const RandomCatPage = () => {
	const {
		data,
		error,
		isError,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ["random-cat"],
		queryFn: getRandomCatImage,
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

			{data && (
				<div className="d-flex justify-content-center">
					<Image src={data.url} fluid />
				</div>
			)}
		</>
	)
}

export default RandomCatPage;
