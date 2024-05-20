import { useEffect, useState } from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { RandomDogImage } from "../types/DogAPI.types";

const RandomDogPage = () => {
	const [data, setData] = useState<RandomDogImage | null>(null);

	const getData = async () => {
		// get data from api
		const res = await axios.get<RandomDogImage>("https://dog.ceo/api/breeds/image/random");
		await new Promise(r => setTimeout(r, 1500));

		// update state with data
		setData(res.data);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<h1>A random doggo 🐶</h1>

			{!data && <p>Loading...</p>}

			{data && data.status === "success" && (
				<div>
					<Image src={data.message} alt="A random doggo" fluid />
				</div>
			)}
		</>
	)
}

export default RandomDogPage;

