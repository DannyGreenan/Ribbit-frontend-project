import { createContext, useState, useEffect } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    const storedLoading = localStorage.getItem("isLoading");
    if (storedLoading) {
      setIsLoading(storedLoading);
    }
  }, []);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
