import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const { data, isLoading, setUrl } = useGetRandomDogImage();

	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}
				>Random doggo</Button>

				<Button
					className="ms-1"
					onClick={() => setUrl("https://dog.ceo/api/breed/shiba/images/random")}
				>Random Shiba fluffer</Button>

				<Button
					className="ms-1"
					onClick={() => {}}
				>MOAR doggos!!</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => {}}
				>Make things go 💣</Button>
			</div>

			{isLoading && <p>Loading...</p>}

			{data && data.status === "success" && (
				<div>
					<Image src={data.message} alt="A random doggo" fluid />
				</div>
			)}
		</>
	)
}

export default RandomDogPage;

