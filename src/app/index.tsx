import React from "react";
import { GetServerSideProps } from "next";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Layout from "@/components/Layout";
import { getProducts } from "@/utils/api";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Button
                  component={Link}
                  href={`/product/${product.id}`}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getProducts(6);
  return {
    props: {
      products: data.products,
    },
  };
};

export default Home;
