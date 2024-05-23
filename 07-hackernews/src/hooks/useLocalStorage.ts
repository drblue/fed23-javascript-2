import { useState } from "react";

/*
type MyFirstTuple = [string, (val: string) => void];
const myTuples: MyFirstTuple = ["omg", "not workey"];
*/

const useLocalStorage = <T>(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		// This will only be executed on the FIRST render when no state exist.
		// The return value will be used as the initial value for the state.
		const value = window.localStorage.getItem(key);
		return value !== null
			? JSON.parse(value)
			: defaultValue;
	});

	const setValue = (value: T) => {
		// set new state
		setStoredValue(value);

		// save new value to localStorage
		window.localStorage.setItem(key, JSON.stringify(value));
	}

	return [
		storedValue,
		setValue,
	] as const;
}

export default useLocalStorage;
