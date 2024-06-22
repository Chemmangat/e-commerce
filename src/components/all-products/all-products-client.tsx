"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CardActions,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Link from "next/link";
import { Product } from "@/utils/api";
import { ArrowUpwardRounded } from "@mui/icons-material";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface AllProductsClientProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

const NoProductsMessage = () => (
  <Box sx={{ width: "100%", textAlign: "center", my: 4 }}>
    <Typography variant="h6" color="white">
      No products to show here. Try adjusting your filters.
    </Typography>
  </Box>
);

const AllProductsClient: React.FC<AllProductsClientProps> = ({
  initialProducts,
  initialCategories,
}) => {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }

      if (selectedRating > 0) {
        filtered = filtered.filter(
          (product) => Math.floor(product.rating) >= selectedRating
        );
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [selectedCategory, selectedRating, products]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleRatingChange = (event: SelectChangeEvent<string>) => {
    setSelectedRating(Number(event.target.value));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ width: "100%", color: "white", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All Products
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel
            id="category-select-label"
            sx={{
              color: "white",
              "&.Mui-focused": { color: "white" },
            }}
          >
            Category
          </InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.8)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "black",
                  "& .MuiMenuItem-root": {
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-selected": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.3)",
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.slug} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel
            id="rating-select-label"
            sx={{
              color: "white",
              "&.Mui-focused": { color: "white" },
            }}
          >
            Rating
          </InputLabel>
          <Select
            labelId="rating-select-label"
            id="rating-select"
            value={selectedRating.toString()}
            label="Rating"
            onChange={handleRatingChange}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.8)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "black",
                  "& .MuiMenuItem-root": {
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-selected": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.3)",
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="0">All Ratings</MenuItem>
            {[1, 2, 3, 4, 5].map((rating) => (
              <MenuItem key={rating} value={rating.toString()}>
                {rating} Stars & Above
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredProducts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProducts.map((product: Product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: 3,
                  borderRadius: 2,
                  bgcolor: "transparent",
                  color: "white",
                  borderColor: "white",
                  border: 2,
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transitions
                  "&:hover": {
                    transform: "translateY(-8px)", // Lift the card on hover
                    boxShadow: "0 8px 16px rgba(0,0,0,0.3)", // Increase shadow on hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="auto"
                  width="auto"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      minHeight: "3.6em",
                      maxHeight: "3.6em",
                      overflow: "hidden",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body1" color="white">
                    ${product.price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Rating
                      name={`rating-${product.id}`}
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({product.rating.toFixed(1)})
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", p: 2 }}>
                  <Button
                    component={Link}
                    href={`/product/${product.id}`}
                    variant="outlined"
                    sx={{
                      width: "50%",
                      color: "white",
                      borderRadius: 5,
                      borderColor: "white",
                      "&:hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoProductsMessage />
      )}

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          variant="text"
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "white",
            color: "black",
            borderRadius: 10,
          }}
        >
          <ArrowUpwardRounded />
        </Button>
      )}
    </Box>
  );
};

export default AllProductsClient;
