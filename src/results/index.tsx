import { useEffect, useRef } from "react";
import { Drinks } from "../types/drinks";
import "./style.css";
type Props = {
  data: {
    drinks: Drinks[];
  };
};

export default function Results({ data }: Props) {
  if (data.drinks === null) return null;
  return (
    <section className="results">
      {data?.drinks?.map((drink: Drinks, index) => {
        const ingredients: string[] = [];
        const measurement: string[] = [];
        const isIngredient = new RegExp(/strIngredient\d+/);
        const ismeasurement = new RegExp(/strMeasure\d+/);
        for (let key in drink) {
          if (isIngredient.test(key)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ingredients.push(drink[key]);
          }
          if (ismeasurement.test(key)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            measurement.push(drink[key]);
          }
        }
        return (
          <div className="card" key={crypto.randomUUID()}>
            <img className="card__image" src={drink.strDrinkThumb} alt="" />
            <div className="card__content">
              <p className="card__category">{drink.strAlcoholic}</p>
              <h3 className="card__header">{drink.strDrink}</h3>
              <ul className="card__ingredients">
                {ingredients.map((ingredient, index) => {
                  if (ingredient !== null) {
                    return (
                      <li key={crypto.randomUUID()} className="list-item">
                        {`${
                          measurement[index] ? measurement[index] : ""
                        } ${ingredient},`}
                      </li>
                    );
                  }
                })}
              </ul>
              <p className="card__instructions">{drink.strInstructions}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
