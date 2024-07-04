import React, { createContext, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../store/slices/themeSlice";



export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // Обновляем класс темы на корневом элементе приложения
    const appRoot = document.getElementById("root");
    appRoot.classList.remove("light", "dark");
    appRoot.classList.add(theme);
  }, [theme]);

  const handleThemeToggle = () => {

    console.log("Toggling theme...");



    dispatch(toggleTheme());
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
