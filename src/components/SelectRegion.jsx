import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppData } from "../AppProvider";

const SelectRegion = () => {
  const regions = [
    "africa",
    "antarctic",
    "americas",
    "asia",
    "europe",
    "oceania",
    "none",
  ];
  const [expanded, setExpanded] = useState(false);
  const {
    state: { region },
    dispatch,
  } = useAppData();

  return (
    <div className="mt-12 ml-[5%] relative w-[235px] font-semibold z-10 md:mt-0 md:ml-0">
      <button
        className="bg-white w-full h-16 shadow-md rounded-lg text-left px-8 flex items-center justify-between dark:bg-darkBlue dark:shadow-lg dark:shadow-black/75"
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls="select-dropdown"
        onClick={() => {
          setExpanded(!expanded);
        }}
        onBlur={() => {
          setTimeout(() => {
            setExpanded(false);
          }, 200);
        }}
      >
        <span className="capitalize dark:text-white">
          {region === "none" ? "Filter by Region" : region}
        </span>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`duration-[400ms] dark:white-icon ${
            expanded ? "rotate-180 " : ""
          }`}
        />
      </button>
      <ul
        role="listbox"
        id="select-dropdown"
        className={`bg-white mt-2 transition-opacity shadow-lg rounded-md overflow-hidden origin-top absolute w-full opacity-0 duration-[400ms] dark:bg-darkBlue dark:shadow-lg dark:shadow-black/75 ${
          expanded ? "expanded" : ""
        }`}
      >
        {regions.map((region, index) => (
          <li
            key={index}
            role="option"
            className="capitalize font-semibold group cursor-pointer relative z-20"
          >
            <input
              type="radio"
              id={region}
              name="region"
              value={region}
              className="absolute peer opacity-0 z-40"
              onChange={(e) => {
                dispatch({ type: "FILTER BY REGION", payload: e.target.value });
              }}
            />
            <label
              htmlFor={region}
              className="cursor-pointer block w-full py-2 px-7 hover:bg-slate-100 peer-focus:bg-slate-100 group-first:pt-4 group-last:pb-4 peer-checked:bg-slate-100 dark:text-white dark:hover:bg-black/[.4] dark:peer-checked:bg-black/[.4] dark:peer-focus:bg-black/[.4] "
            >
              {region}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SelectRegion;
