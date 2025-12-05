import { useNavigate } from "react-router-dom";

const Country = ({ country }) => {
  const {
    name: { common },
    population,
    region,
    capital,
    flags: { alt, png },
  } = country;
  const navigate = useNavigate();
  const handleClick = (countryName) => {
    navigate(countryName);
  };

  return (
    <article
      className="rounded-lg transition-transform duration-200 mx-auto overflow-hidden shadow-xl w-full max-w-sm cursor-pointer hover:translate-y-[-16px] dark:shadow-black dark:bg-darkBlue md:mx-0 md:max-w-none"
      onClick={() => {
        handleClick(common);
      }}
    >
      <img src={png} alt={alt || 'flag'} className="h-[165px] object-cover w-full" />
      <div className="px-8 pt-8 pb-12">
        <h2 className="font-extrabold text-[20px] mb-3 dark:text-white">
          {common}
        </h2>
        <ul>
          <li className="font-semibold leading-7 dark:text-white dark:font-normal">
            <span className="font-extrabold dark:text-white">Population: </span>
            {population.toLocaleString()}
          </li>
          <li className="font-semibold leading-7 dark:text-white dark:font-normal">
            <span className="font-extrabold dark:text-white">Region: </span>
            {region}
          </li>
          <li className="font-semibold leading-7 dark:text-white dark:font-normal">
            <span className="font-extrabold dark:text-white">Capital: </span>
            {capital || "None"}
          </li>
        </ul>
      </div>
    </article>
  );
};
export default Country;
