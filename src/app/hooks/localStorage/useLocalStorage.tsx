"use client";

import { useState } from "react";

const useLocalStorageArray = (
  key: string,
  initialValue: string[],
  // eslint-disable-next-line no-unused-vars
): [string[], (newValue: string[]) => void] => {
  // Retrieve initial value from localStorage if available
  const storedValue = localStorage.getItem(key);
  const initial: string[] = storedValue
    ? JSON.parse(storedValue)
    : initialValue;

  // Initialize state with the initial value
  const [value, setValue] = useState<string[]>(initial);

  // Define a function to update localStorage and state value
  const updateValue = (newValue: string[]) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  // Return the value from state and a function to update it
  return [value, updateValue];
};

export default useLocalStorageArray;
