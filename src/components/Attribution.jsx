import { useEffect, useState } from "react";

const Attribution = () => {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => {
      setHide(true);
    }, 5000);

    return () => {
      clearTimeout(id);
    };
  }, []);
  useEffect(() => {
    let id = null;
    const showAttri = () => {
      if (hide) {
        clearTimeout(id)
        setHide(false);
      }
    };
    const hideAttri = () => {
      id = setTimeout(() => {
        setHide(true);
      }, 3000);
    };
    window.addEventListener("scroll", showAttri);
    window.addEventListener("scrollend", hideAttri);

    return () => {
      window.removeEventListener("scroll", showAttri);
      window.removeEventListener("scrollend", hideAttri);
      clearTimeout(id);
    };
  }, [hide]);
  return (
    <footer
      className={`min-h-[32px] bg-white max-w-[1700px] mx-auto shadow-[0_-4px_6px_-1px] shadow-black/[.23] dark:bg-darkBlue dark:text-white dark:shadow-black/75 w-full fixed duration-500 ${
        hide ? "bottom-[-50px]" : "bottom-0"
      } left-0 right-0 text-center pt-[6px] font-semibold`}
    >
      Challenge by{" "}
      <a
        rel="noreferrer"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        className="text-blue-600 underline dark:text-blue-300"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        className="text-blue-600 underline dark:text-blue-300"
        href="https://www.frontendmentor.io/profile/Ihezie"
      >
        Raymond I. Ogbuehi
      </a>
      .
    </footer>
  );
};

export default Attribution;
