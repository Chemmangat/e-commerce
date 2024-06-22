import React from "react";
import { Box } from "@mui/material";
import AllProducts from "@/components/all-products/page";
import FeaturedProducts from "@/components/featured-products/page";
import Footer from "@/components/footer";

export default async function Home() {
  return (
    <Box sx={{ color: "white", m: 0 }}>
      <FeaturedProducts />
      <AllProducts />
      <Footer />
    </Box>
  );
}
