"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { setUser, getAllUsers } from "@/utils/secureStorage";
import { useSnackbar } from "notistack";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        const users = await getAllUsers();
        if (
          users.some(
            (user) =>
              user.username === data.username || user.email === data.email
          )
        ) {
         
           enqueueSnackbar("Username or Email already exists.", { variant: "error" });
          return;
        }
        await setUser(data.username, data);
        
           enqueueSnackbar("Sign Up Successful.", { variant: "success" });
        router.push("/sign-in");
        setLoading(false);
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("An unexpected error occurred during registration");
      setLoading(false);
    } finally {
      setLoading(false);
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
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
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
          textAlign: "center",
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
          id="email"
          label="Email Address"
          autoComplete="email"
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
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
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
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#32CD32" }} />
          ) : (
            <Typography variant="subtitle2"> Sign Up</Typography>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
