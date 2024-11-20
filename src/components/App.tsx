import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import BestRecipesPage from "./BestRecipes";
import OneRecipe from "../OneRecipe";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const App: React.FC = () => {
  const [bestRecipes, setBestRecipes] = useState<Category[]>([]);

  const handleAddToBestRecipes = (category: Category) => {
    if (
      !bestRecipes.find((recipe) => recipe.idCategory === category.idCategory)
    ) {
      setBestRecipes((prev) => [...prev, category]);
    }
  };

  const handleRemoveFromBestRecipes = (id: string) => {
    setBestRecipes((prev) => prev.filter((recipe) => recipe.idCategory !== id));
  };

  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "20px" }}>
          Home
        </Link>
        <Link to="/best-recipes">Best Recipes</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home onAddToBestRecipes={handleAddToBestRecipes} />}
        />
        <Route
          path="/best-recipes"
          element={
            <BestRecipesPage
              bestRecipes={bestRecipes}
              onRemoveFromBestRecipes={handleRemoveFromBestRecipes}
            />
          }
        />
        <Route
          path="/recipe/:id"
          element={<OneRecipe onAddToBestRecipes={handleAddToBestRecipes} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
