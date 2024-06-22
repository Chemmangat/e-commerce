"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { getUser } from "@/utils/secureStorage";
import { useUser } from "@/contexts/UserContext";
import { useSnackbar } from "notistack";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const [error] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      // First, check IndexedDB
      if (typeof window !== "undefined") {
        const user = await getUser(data.username);
        if (user && user.password === data.password) {
          const userData = { username: user.username, email: user.email };
          sessionStorage.setItem("currentUser", JSON.stringify(userData));
          setUser(userData);
           enqueueSnackbar("Log In Successful.", { variant: "success" });
          router.push("/shop");
          return;
        }
      }

      // If not found in IndexedDB, try DummyJSON API
      try {
        const response = await axios.post(
          "https://dummyjson.com/auth/login",
          data
        );
        const userData = {
          username: response.data.username,
          email: response.data.email,
        };
        sessionStorage.setItem("currentUser", JSON.stringify(userData));
        setUser(userData);
        enqueueSnackbar("Log In Successful.", { variant: "success" });
        router.push("/shop");
      } catch (apiError) {
        console.error("API Error:", apiError);
        enqueueSnackbar("Invalid username or password", { variant: "error" });
      }
    } catch (err) {
      console.error("Login Error:", err);
      enqueueSnackbar("An unexpected error occurreS", { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 3,
        top: 0,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          mt: 1,
          width: "100%",
          maxWidth: "400px",
          bgcolor: "transparent",
          p: 3,
          borderRadius: 5,
          borderColor: "white",
          border: 2,
          "&:hover": {
            borderColor: "#32CD32",
          },
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: { color: "white" },
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          }}
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: { color: "white" },
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          }}
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: "transparent",
            color: "#32CD32",
            border: 2,
            borderColor: "#32CD32",
            borderRadius: 5,
            width: "50%",
            "&:hover": {
              bgcolor: "#32CD32",
              color: "black",
            },
          }}
        >
          <Typography variant="subtitle2">Sign In</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
