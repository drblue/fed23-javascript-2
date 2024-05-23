import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

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
	const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>("hn_darkmode", false);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
