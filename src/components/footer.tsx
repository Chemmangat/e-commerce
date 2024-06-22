// components/Footer.tsx
import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        padding: "40px 0",
        marginTop: "40px",
        borderTop: 2,
        borderColor: "White",
        width: "100%",
        p: 3,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            Welcome to our online store. We offer a wide range of products to
            cater to all your needs. Shop with us for the best quality and
            prices.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Box component="ul" sx={{ padding: 0, listStyle: "none" }}>
            <li>
              <Link href="#" color="inherit" underline="hover">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" color="inherit" underline="hover">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" color="inherit" underline="hover">
                Return Policy
              </Link>
            </li>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Box component="ul" sx={{ padding: 0, listStyle: "none" }}>
            <li>
              <Link href="#" color="inherit" underline="hover">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="mailto:support@onlinestore.com"
                color="inherit"
                underline="hover"
              >
                Email: support@onlinestore.com
              </Link>
            </li>
            <li>
              <Link href="tel:+1234567890" color="inherit" underline="hover">
                Phone: +123 456 7890
              </Link>
            </li>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Careers
          </Typography>
          <Box component="ul" sx={{ padding: 0, listStyle: "none" }}>
            <li>
              <Link href="#" color="inherit" underline="hover">
                Job Openings
              </Link>
            </li>
            <li>
              <Link href="#" color="inherit" underline="hover">
                Internships
              </Link>
            </li>
            <li>
              <Link href="#" color="inherit" underline="hover">
                Freelance Opportunities
              </Link>
            </li>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
