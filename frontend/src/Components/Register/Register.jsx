import { Avatar, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../Actions/User";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password, avatar));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }
    }, [dispatch, error]);

    return (
        <div className="register">
            <form className="registerForm" onSubmit={submitHandler}>
                <Typography
                    variant="h3"
                    style={{ padding: "2vmax" }}
                    className="title"
                >
                    Intra Share
                </Typography>

                <Avatar
                    src={avatar}
                    alt="User"
                    sx={{ height: "10vmax", width: "10vmax" }}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                ></input>

                <input
                    type="text"
                    placeholder="Name"
                    required
                    className="registerInputs"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>

                <input
                    type="email"
                    placeholder="Email"
                    className="registerInputs"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="registerInputs"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link to="/">
                    <Typography>Already Signed Up?</Typography>
                </Link>

                <Button disabled={loading} type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default Register;
