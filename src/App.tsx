// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the structure of the data
interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  [key: string]: any; // To handle additional dynamic fields
}

const App: React.FC = () => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get<{ meals: Meal[] | null }>(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
        );
        const data = response.data.meals;

        if (data && data.length > 0) {
          setMeal(data[0]); // Assuming we want the first meal
        } else {
          setMeal(null);
        }
      } catch (err) {
        setError("Failed to fetch meal data");
      }
    };

    fetchMeal();
  }, []);

  return (
    <div>
      <h1>Meal Details</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {meal ? (
        <div>
          <h2>{meal.strMeal}</h2>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            style={{ width: "300px" }}
          />
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
          <p>
            <strong>Instructions:</strong> {meal.strInstructions}
          </p>
          {meal.strYoutube && (
            <p>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </p>
          )}
        </div>
      ) : (
        <p>No meal found</p>
      )}
    </div>
  );
};

export default App;
