import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useQuery } from "react-query";
import { BsSearch } from "react-icons/bs";
import Results from "./results";
import NoResults from "./results/NoResults";

function App() {
  const [enableQuery, setEnableQuery] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const result = useRef<HTMLDivElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnableQuery(true);
  }

  function clearSearch() {
    setSearchQuery("");
    scrollTo(0, 0);
    setNoResults(false);
  }

  const { isLoading, error, data, isFetched, isFetching } = useQuery(
    "repoData",
    () =>
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
      ).then((res) => res.json()),
    {
      enabled: enableQuery,
      onSuccess: ({ drinks }) => {
        setEnableQuery(false);
        if (drinks === null) {
          setNoResults(true);
        }
      },
    }
  );

  useEffect(() => {
    if (data || noResults) {
      result.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, noResults]);

  if (error) return <Error />;

  return (
    <main>
      <header className="header">
        <div className="header__container">
          <div className="logo">
            <p>COCKTAIL</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="label" htmlFor="search">
              Search Cocktails or Ingredients.
            </label>
            <div className="flex-group">
              <BsSearch className="icon" />
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                name="search"
              />
              {!isFetching && <button type="submit">Search</button>}
              {isFetching && (
                <button type="submit">
                  <Loading />
                </button>
              )}
            </div>
          </form>
        </div>
      </header>
      <div className="results" ref={result}>
        {data && <Results data={data} />}
        {noResults && (
          <NoResults clearSearch={clearSearch} query={searchQuery} />
        )}
      </div>
    </main>
  );
}

export default App;

function Loading() {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function Error() {
  return (
    <div>
      <p>Error</p>
    </div>
  );
}
