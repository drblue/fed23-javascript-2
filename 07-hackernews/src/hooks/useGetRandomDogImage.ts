import { useEffect, useState } from "react";
import axios from "axios";
import { RandomDogImage } from "../types/DogAPI.types";

const useGetRandomDogImage = () => {
	const [data, setData] = useState<RandomDogImage | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [url, setUrl] = useState<string | null>(null);

	const getData = async (resourceUrl: string) => {
		// reset state
		setData(null);
		setIsLoading(true);

		// get data from api
		const res = await axios.get<RandomDogImage>(resourceUrl);
		await new Promise((r) => setTimeout(r, 1500));

		// update state with data
		setData(res.data);
		setIsLoading(false);
	};

	const execute = () => {
		if (!url) {
			return;
		}

		getData(url);
	}

	useEffect(() => {
		if (!url) {
			return;
		}

		getData(url);
	}, [url]);

	return {
		data,
		execute,
		isLoading,
		setUrl,
	}
}

export default useGetRandomDogImage;
