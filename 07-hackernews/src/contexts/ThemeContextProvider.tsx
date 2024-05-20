import { createContext, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
	theme: ThemeMode;
}

// This creates the actual context and sets the context's default value
export const ThemeContext = createContext<ThemeContextType>({ theme: "dark" });

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeMode>("dark");

	return (
		<ThemeContext.Provider value={{ theme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
