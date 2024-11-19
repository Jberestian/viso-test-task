import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Recipe {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface BestRecipesPageProps {
  bestRecipes: Recipe[];
  onRemoveFromBestRecipes: (id: string) => void;
}

const ITEMS_PER_PAGE = 6;

const BestRecipesPage: React.FC<BestRecipesPageProps> = ({
  bestRecipes,
  onRemoveFromBestRecipes,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Pagination Logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const paginatedRecipes = bestRecipes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Best Recipes</h1>
      {bestRecipes.length === 0 ? (
        <p>No recipes added to Best Recipes yet!</p>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.idCategory}>
                <Card style={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.strCategoryThumb}
                    alt={recipe.strCategory}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {recipe.strCategory}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.strCategoryDescription.slice(0, 100)}...
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to={`/recipe/${recipe.idCategory}`}
                      style={{ marginTop: "10px", marginRight: "10px" }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onRemoveFromBestRecipes(recipe.idCategory)}
                      style={{ marginTop: "10px" }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={Math.ceil(bestRecipes.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BestRecipesPage;
