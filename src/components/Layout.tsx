"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setUser(null);
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Redirect to home or sign-in page
    router.push("/sign-in");
  };

  return (
    <SnackbarProvider>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "64px", // Adjust as needed
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(5px)",
          zIndex: 999,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>
              Online Store
            </Link>
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Welcome, {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                style={{ color: "white", marginRight: "1rem" }}
              >
                Sign In
              </Link>
              <Link href="/sign-up" style={{ color: "white" }}>
                Sign Up
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, width: "100%", p: 0, mt: 10 }}>
        {children}
      </Box>
      <Box
        component="footer"
        sx={{ py: 2, px: 2, mt: "auto", backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="white" align="center">
            © 2024 Online Store - Hari Manoj 9539299899
          </Typography>
        </Container>
      </Box>
    </Box></SnackbarProvider>
  );
};

export default Layout;
