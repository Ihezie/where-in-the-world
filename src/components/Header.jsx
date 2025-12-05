import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getFromLocalStorage } from "../utils";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.theme);

  useEffect(() => {
    if (theme) {
      localStorage.theme = theme;
    }
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!localStorage.theme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  return (
    <header className="sticky top-0 right-0 left-0 z-20 flex justify-between h-24 items-center px-[5%] bg-white max-w-[1700px] mx-auto shadow-md dark:bg-darkBlue dark:text-white dark:shadow-lg dark:shadow-black/75">
      <h1 className="font-extrabold md:text-2xl lg:text-3xl dark:text-white">
        <Link to="/">Where in the world?</Link>
      </h1>
      <button
        className="cursor-pointer font-semibold md:text-xl"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        <FontAwesomeIcon
          icon={faMoon}
          size="xl"
          className="mr-3 dark:white-icon"
        />
        Dark Mode
      </button>
    </header>
  );
};
export default Header;
