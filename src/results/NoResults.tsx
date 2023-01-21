import { useEffect, useRef } from "react";
import "./style.css";

type Props = {
  clearSearch: () => void;
  query: string;
};

export default function NoResults({ clearSearch, query }: Props) {
  const card = useRef<HTMLDivElement>(null);
  return (
    <div className="card" ref={card}>
      <div className="card__content">
        <h3>Sorry, no results for {query}</h3>
        <p>
          check spelling and try searching either by cocktail name or ingredient{" "}
        </p>
        <button className="link" onClick={clearSearch}>
          Clear Search
        </button>
      </div>
    </div>
  );
}
