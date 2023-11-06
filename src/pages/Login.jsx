import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import CITEDU from "../assets/imgs/CIT Education.png";
import Logo from "../assets/imgs/Logo.jpg";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://www.facebook.com/citeducation3105">
                CIT Education
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
});

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        const dataRegister = JSON.parse(localStorage.getItem("dataRegister"));
        if (
            dataRegister?.email === data?.email &&
            dataRegister?.password === data?.password
        ) {
            toast.success("Login successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else {
            toast.error("Login failed", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
        }
    };

    return (
        <>
            {loading ? (
                <Box
                    sx={{ display: "flex", justifyContent: "center", marginTop: "25%" }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: "flex", height: "100vh" }}>
                    <Box
                        component="img"
                        sx={{
                            height: "100%",
                            width: "50%",
                        }}
                        alt="CITEDU"
                        src={CITEDU}
                    />
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: 200,
                                    width: 200,
                                }}
                                alt="Logo"
                                src={Logo}
                            />
                            <Typography component="h1" variant="h5">
                                Sign in CIT Education
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 3 }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register("email")}
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                        />
                                        <Typography
                                            sx={{ fontSize: "12px", marginTop: "7px" }}
                                            color="tomato"
                                        >
                                            {errors.email && errors.email.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register("password")}
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                        />
                                        <Typography
                                            sx={{ fontSize: "12px", marginTop: "7px" }}
                                            color="tomato"
                                        >
                                            {errors.password && errors.password.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox value="allowExtraEmails" color="primary" />
                                            }
                                            label="Agree with CIT Education's terms and conditions"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/register" variant="body2">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </Box>
            )}
        </>
    );
}

export default Login;
