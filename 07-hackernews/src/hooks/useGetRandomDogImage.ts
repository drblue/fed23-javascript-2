import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { RandomDogImage } from "../types/DogAPI.types";

const useGetRandomDogImage = () => {
	const [data, setData] = useState<RandomDogImage | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [url, setUrl] = useState<string | null>(null);

	const changeUrl = (newUrl: string) => {
		// Validate that `newUrl` actually is a valid URL
		try {
			const validatedUrl = new URL(newUrl);
			setUrl(validatedUrl.toString());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something that was not an Error was thrown");
			setIsError(true);
		}
	}

	const getData = async (resourceUrl: string) => {
		// reset state
		setData(null);
		setIsError(false);
		setIsLoading(true);

		// get data from api
		try {
			const res = await axios.get<RandomDogImage>(resourceUrl);
			await new Promise((r) => setTimeout(r, 1500));

			// update state with data
			setData(res.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something that was not an Error was thrown");
			setIsError(true);
		}

		setIsLoading(false);
	};

	const execute = useCallback( () => {
		if (!url) {
			return;
		}

		getData(url);
	}, [url]);

	console.log("execute:", execute);

	useEffect(() => {
		execute();
	}, [execute]);

	return {
		changeUrl,
		data,
		error,
		execute,
		isError,
		isLoading,
	}
}

export default useGetRandomDogImage;
