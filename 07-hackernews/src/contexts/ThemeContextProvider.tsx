import { createContext, useState } from "react";

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

// This creates the actual context and sets the context's default value
export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// This will only be executed on the FIRST render when no state exist.
		// The return value will be used as the initial value for the state.
		console.log("Getting initialState for `isDarkMode` from localStorage `hn_darkmode`...");
		const localStorage_hn_darkmode = window.localStorage.getItem("hn_darkmode");
		return localStorage_hn_darkmode === "true";
	});

	console.log("ThemeContextProvider rendering...");

	const toggleTheme = () => {
		// set new state
		setIsDarkMode(!isDarkMode);

		// save new theme to localStorage
		// N.B! isDarkMode hasn't changed yet as React batches updating of states!
		console.log("Saving theme to localStorage");
		window.localStorage.setItem("hn_darkmode", String(!isDarkMode));
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
