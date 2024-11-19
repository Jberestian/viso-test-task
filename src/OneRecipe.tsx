import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

interface RecipeDetails {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface OneRecipeProps {
  onAddToBestRecipes: (recipe: RecipeDetails) => void;
}

const OneRecipe: React.FC<OneRecipeProps> = ({ onAddToBestRecipes }) => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<{ categories: RecipeDetails[] }>(
          `https://www.themealdb.com/api/json/v1/1/categories.php`
        );
        const recipeDetails = response.data.categories.find(
          (category) => category.idCategory === id
        );

        if (recipeDetails) {
          setRecipe(recipeDetails);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to fetch recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return recipe ? (
    <Card style={{ maxWidth: "600px", margin: "20px auto" }}>
      <CardMedia
        component="img"
        height="300"
        image={recipe.strCategoryThumb}
        alt={recipe.strCategory}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {recipe.strCategory}
        </Typography>
        <Typography variant="body1" paragraph>
          {recipe.strCategoryDescription}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToBestRecipes(recipe)}
        >
          Add to Best Recipes
        </Button>
      </CardContent>
    </Card>
  ) : null;
};

export default OneRecipe;
