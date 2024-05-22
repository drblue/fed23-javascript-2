import { RandomDogImage } from "../types/DogAPI.types";
import useGetData from "./useGetData";

const useGetRandomDogImage = () => {
	return useGetData<RandomDogImage>("https://dog.ceo/api/breed/mountain/bernese/images/random");
}

export default useGetRandomDogImage;
