import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CardActions,
  Rating,
} from "@mui/material";
import Link from "next/link";
import { getProducts, Product } from "@/utils/api";

export default async function FeaturedProducts() {
  const data = await getProducts(6);
  const products: Product[] = data.products;

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Featured Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          p: 3,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "4px",
          },
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        {products.map((product: Product) => (
          <Card
            key={product.id}
            sx={{
              minWidth: 280,
              maxWidth: 280,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              bgcolor: "black",
              color: "white",
              mr: 3,
              border: 2,
              borderColor: "white",
              justifyContent: "space-between",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              borderRadius: 8,
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              animation: "fadeIn 1.5s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="auto"
              width="auto"
              image={product.thumbnail}
              alt={product.title}
              sx={{ objectFit: "fill" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  height: "3.6em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
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
                  width: "70%",
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
        ))}
      </Box>
    </Box>
  );
}
