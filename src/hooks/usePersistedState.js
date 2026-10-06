import { useEffect, useState } from "react";

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      try {
        return JSON.parse(savedValue);
      } catch (error) {
        console.error("Could not parse localStorage data:", error);
        return defaultValue;
      }
    }

    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
