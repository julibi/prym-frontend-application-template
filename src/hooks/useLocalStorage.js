import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(
    () => {
      const localFormState = JSON.parse(window.localStorage.getItem(key));
      return localFormState ? localFormState : initialValue;
    }
  );

  const setValue = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }

  return [storedValue, setValue];
};

export default useLocalStorage;
