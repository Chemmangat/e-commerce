import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  Grid,
  Chip,
  Box,
  Rating,
} from "@mui/material";
import { getProduct, Product } from "../../../utils/api";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Footer from "@/components/footer";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: PageProps) {
  const product: Product = await getProduct(Number(params.id));

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={12}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.thumbnail}
                alt={product.title}
                sx={{ objectFit: "fill" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Brand: {product.brand}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Category: {product.category}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Rating
                name="product-rating"
                value={product.rating}
                precision={0.1}
                readOnly
                icon={<StarIcon fontSize="inherit" />}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                sx={{ mr: 2 }}
              />
              <Typography variant="subtitle1">
                {product.rating.toFixed(1)} / 5
              </Typography>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              Stock: {product.stock}
            </Typography>
            <Chip
              label={`${product.discountPercentage}% OFF`}
              color="secondary"
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
