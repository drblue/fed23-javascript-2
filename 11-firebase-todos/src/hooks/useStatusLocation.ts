import { Location, useLocation } from "react-router-dom";

interface StatusLocation {
	status: { type: string; message: string };
}

const useStatusLocation = (): Location<StatusLocation> => {
	return useLocation();
};

export default useStatusLocation;
