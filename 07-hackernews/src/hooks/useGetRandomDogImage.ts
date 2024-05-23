import { RandomDogImage } from "../types/DogAPI.types";
import useGetData from "./useGetData";

const useGetRandomDogImage = (breed?: string) => {
	const url = breed
		? `https://dog.ceo/api/breed/${breed}/images/random`
		: "https://dog.ceo/api/breeds/image/random";

	return useGetData<RandomDogImage>(url);
}

export default useGetRandomDogImage;
