import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { PacmanLoader } from "react-spinners";

const GlobalLoadingSpinner = () => {
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();
	const loadingCounter = isFetching + isMutating;

	return (
		<div id="global-loading-spinner-wrapper">
			<PacmanLoader
				color="#007bff"
				loading={!!loadingCounter}
				size={20}
				speedMultiplier={1.5}
			/>
		</div>
	)
}

export default GlobalLoadingSpinner;
