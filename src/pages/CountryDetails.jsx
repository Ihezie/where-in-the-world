import { useParams, Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useAppData } from "../AppProvider";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const {
    state: { data, loading },
  } = useAppData();

  useEffect(() => {
    if (!loading) {
      const country =
        data.find(
          (country) =>
            country.name.common.toLowerCase() === countryName.toLowerCase()
        ) || "not found";
      setCountryDetails(country);
    }
  }, [countryName, loading, data]);

  const displayDetailsInObjects = (detailsObject, ...properties) => {
    if (detailsObject) {
      return Object.entries(detailsObject).map((item, index) => {
        const itemProperty = item[1];
        const length = Object.keys(detailsObject).length;
        if (length > 1 && index !== length - 1) {
          return properties.length > 0
            ? properties.map((property) => {
                if (property === "symbol") {
                  return ` (${itemProperty[property]}) `;
                }
                return `${itemProperty[property]}, `;
              })
            : `${itemProperty}, `;
        }
        return properties.length > 0
          ? properties.map((property) => {
              if (property === "symbol") {
                return ` (${itemProperty[property]}) `;
              }
              return `${itemProperty[property]} `;
            })
          : itemProperty;
      });
    } else {
      return null;
    }
  };

  if (!countryDetails) {
    return (
      <main>
        <div>
          <div className="mx-auto mt-32 w-min">
            <Loading />
          </div>
        </div>
      </main>
    );
  }

  if (countryDetails === "not found") {
    return <Navigate to="/error" replace />;
  }

  const {
    name: { common, nativeName },
    population,
    region,
    capital,
    subregion,
    flags: { alt, png },
    currencies,
    languages,
    borders,
  } = countryDetails;

  return (
    <main className="mt-12 px-[8%] text-[16px] pb-16 sm:px-[12%] lg:px-[5%] max-w-[1700px] mx-auto">
      <button className="details-btn mb-16 w-28">
        <Link to="/" className="w-full h-full inline-block">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="dark:white-icon mr-4"
          />
          Back
        </Link>
      </button>
      <section className="flex flex-col gap-14 lg:grid lg:grid-cols-2 xl:items-center">
        <img src={png} alt={alt} className="w-full" />
        <div>
          <h2 className="text-3xl font-extrabold dark:text-white">{common}</h2>
          <div className="mt-2 flex flex-col gap-10 mb-8 md:grid md:grid-cols-2">
            <ul>
              <Detail detailName="Native Name(s)">
                {displayDetailsInObjects(nativeName, "common")}
              </Detail>
              <Detail detailName="population">
                {population.toLocaleString()}
              </Detail>
              <Detail detailName="region">{region}</Detail>
              <Detail detailName="sub region">{subregion}</Detail>
              <Detail detailName="capital">{capital}</Detail>
            </ul>

            <ul>
              <Detail detailName="currencies">
                {displayDetailsInObjects(currencies, "name", "symbol")}
              </Detail>
              <Detail detailName="languages">
                {displayDetailsInObjects(languages)}
              </Detail>
            </ul>
          </div>
          <h2
            className={`text-2xl font-semibold mb-4 mr-4 dark:text-white xl:inline-block ${
              borders ? "block" : "inline-block"
            }`}
          >
            Border Countries:
          </h2>
          {borders.length > 0 ? (
            <ul className="flex flex-wrap gap-3 xl:inline-flex">
              {borders.map((border, index) => {
                const borderCountry = data.find(
                  (country) => country.cca3 === border
                );
                return (
                  <li key={index}>
                    <button className="details-btn">
                      <Link
                        className="w-full h-full inline-block"
                        to={`/${borderCountry.name?.common?.toLowerCase()}`}
                      >
                        {borderCountry?.name?.common}
                      </Link>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span className="dark:text-white">None</span>
          )}
        </div>
      </section>
    </main>
  );
};
export default CountryDetails;

const Detail = ({ detailName, children }) => {
  return (
    <li className=" leading-9 dark:text-white dark:font-normal">
      <span
        className={`font-semibold dark:text-white ${
          detailName === "Native Name(s)" ? "" : "capitalize"
        }`}
      >
        {detailName}:{" "}
      </span>
      {children || "None"}
    </li>
  );
};
