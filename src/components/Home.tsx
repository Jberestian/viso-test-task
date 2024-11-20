import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface HomeProps {
  onAddToBestRecipes: (category: Category) => void;
}

const ITEMS_PER_PAGE = 6;

const Home: React.FC<HomeProps> = ({ onAddToBestRecipes }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ categories: Category[] }>(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
        setFilteredCategories(response.data.categories); // Initially show all categories
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  // Search and Filter Logic
  useEffect(() => {
    let updatedCategories = categories;

    // Filter by category if selected
    if (selectedCategory !== "All") {
      updatedCategories = updatedCategories.filter(
        (category) => category.strCategory === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      updatedCategories = updatedCategories.filter((category) =>
        category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCategories(updatedCategories);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [searchQuery, selectedCategory, categories]);

  // Pagination Logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Recipe Categories</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search and Filter Controls */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="All">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Recipe Cards */}
      <Grid container spacing={3}>
        {paginatedCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.idCategory}>
            <Card style={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={category.strCategoryThumb}
                alt={category.strCategory}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.strCategory}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.strCategoryDescription.slice(0, 100)}...
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={`/recipe/${category.idCategory}`}
                  style={{ marginTop: "10px", marginRight: "10px" }}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAddToBestRecipes(category)}
                  style={{ marginTop: "10px" }}
                >
                  Add to Best Recipes
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
