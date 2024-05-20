import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";

const useTheme = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of ThemeContextProvider");
	}

	return themeContext;
}

export default useTheme;
