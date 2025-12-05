import SearchBar from "../components/SearchBar";
import SelectRegion from "../components/SelectRegion";
import Country from "../components/Country";
import NotFound from "../components/NotFound";
import { useAppData } from "../AppProvider";
import { useState, useEffect } from "react";
import Loading from "../components/loading";

const Countries = () => {
  const {
    state: { data, loading, region, searchParam },
  } = useAppData();

  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (!loading) {
      const filteredData = data.filter((country) => {
        let inRegion = false;
        let matchesSearch = false;
        if (region === "none") {
          inRegion = true;
        } else {
          inRegion = country.region.toLowerCase() === region;
        }
        if (searchParam === "") {
          matchesSearch = true;
        } else {
          matchesSearch = country.name.common
            .toLowerCase()
            .includes(searchParam.toLowerCase());
        }
        return inRegion && matchesSearch;
      });
      setLocalData(filteredData.length === 0 ? "no match" : filteredData);
    }
  }, [loading, region, searchParam, data]);

  return (
    <main className="max-w-[1700px] mx-auto pb-16">
      <div className="mt-8 md:flex md:mx-[5%] md:justify-between">
        <SearchBar />
        <SelectRegion />
      </div>
      {!localData ? (
        <div>
          <div className="mx-auto mt-32 w-min">
            <Loading />
          </div>
        </div>
      ) : localData === "no match" ? (
        <NotFound />
      ) : (
        <section className="mt-12 grid grid-cols-countries justify-center gap-16 !p-5per px-[13%] sm:px-[5%] md:max-xl:grid-cols-countries-md">
          {localData.map((country, index) => (
            <Country key={index} country={country} />
          ))}
        </section>
      )}
    </main>
  );
};
export default Countries;
