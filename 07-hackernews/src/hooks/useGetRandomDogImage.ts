import { RandomDogImage } from "../types/DogAPI.types";
import useGetData from "./useGetData";

const getRandomDogImageUrl = (breed?: string) => {
	return breed
		? `https://dog.ceo/api/breed/${breed}/images/random`
		: "https://dog.ceo/api/breeds/image/random";
}

const useGetRandomDogImage = (breed?: string) => {
	const url = getRandomDogImageUrl(breed);
	const query = useGetData<RandomDogImage>(url);

	const getRandomDogImage = (breed?: string) => {
		const url = getRandomDogImageUrl(breed);
		query.changeUrl(url);
	}

	return {
		getRandomDogImage,
		...query,
	};
}

export default useGetRandomDogImage;
