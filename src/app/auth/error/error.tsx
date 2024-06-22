"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";

export default function AuthError() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Authentication Error
      </Typography>
      <Typography variant="body1">
        There was an error during authentication. You will be redirected to the
        login page in 5 seconds.
      </Typography>
    </Box>
  );
}
