"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Icon,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Wide Selection",
    description:
      "Explore our vast array of products to find exactly what you need.",
    icon: LocalMallIcon,
  },
  {
    title: "Quality Assured",
    description:
      "We guarantee the quality and authenticity of all our products.",
    icon: VerifiedIcon,
  },
  {
    title: "Fast Shipping",
    description:
      "Get your orders delivered quickly and efficiently to your doorstep.",
    icon: LocalShippingIcon,
  },
];

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const [showFeatures, setShowFeatures] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    router.push("/shop");
  };

  useEffect(() => {
    const featuresRefCurrent = featuresRef.current; // Store current ref value in a local variable

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowFeatures(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (featuresRefCurrent) {
      // Use the stored ref value here
      observer.observe(featuresRefCurrent); // Use the stored ref value here
    }

    return () => {
      if (featuresRefCurrent) {
        // Use the stored ref value for cleanup
        observer.unobserve(featuresRefCurrent); // Use the stored ref value for cleanup
      }
    };
  }, []);


  return (
    <Box>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <Box
        sx={{
          backgroundImage: "url(/assets/images/ecommerce.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          objectFit: "cover",
        }}
      >
        <Container maxWidth="md">
          <Typography variant={isMobile ? "h3" : "h2"} gutterBottom>
            Welcome to Our Online Store
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Discover a world of amazing products at your fingertips
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ShoppingCartIcon />}
            onClick={handleClick}
            sx={{ mt: 2, color: "white" }}
          >
            Start Shopping
          </Button>
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: "background.paper" }} ref={featuresRef}>
        <Container maxWidth="md">
          <Fade in={showFeatures} timeout={1000}>
            <div>
              <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                sx={{ color: "black" }}
              >
                Why Choose Us?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                {features.map((feature, index) => (
                  <Fade
                    key={index}
                    in={showFeatures}
                    timeout={1000 + index * 500}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        mb: isMobile ? 4 : 0,
                        opacity: 0,
                        animation: showFeatures
                          ? `fadeIn 1s ease-out ${index * 0.3}s forwards`
                          : "none",
                      }}
                    >
                      <Icon
                        component={feature.icon}
                        sx={{ fontSize: 40, color: "black", mb: 2 }}
                      />
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "black" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "black" }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Fade>
                ))}
              </Box>
            </div>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
