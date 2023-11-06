import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { useNavigate } from "react-router-dom";
import axios from "axios";

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 90,
    },
    { field: "fristName", headerName: "FristName", width: 130 },
    { field: "lastName", headerName: "LastName", width: 130 },
    { field: "age", headerName: "Age", width: 130 },
    {
        field: "email",
        headerName: "email",
        width: 90,
    },
    {
        field: "address",
        headerName: "address",
        width: 160,
    },
];

function Home() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");

    useEffect(() => {
        const dataRegister = JSON.parse(localStorage.getItem("dataRegister"));
        if (!dataRegister) {
            navigate("/register");
        }
        const res = axios.get(
            "https://649cf38a9bac4a8e669d1b36.mockapi.io/todolist"
        );
        res.then((data) => {
            setName(dataRegister.lastName);
            setTimeout(() => {
                setUsers(data.data);
                setLoading(false);
            }, 3000);
        });
    }, [navigate]);

    const handleLogOut = () => {
        localStorage.removeItem("dataRegister")
        navigate("/register");
    }

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Chip
                    sx={{ marginRight: "20px" }}
                    avatar={<Avatar alt="Natacha" src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/342856590_2698530430289335_1879165501170848005_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=njNqb4xWoicAX_wk2os&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDpdY9BMh1_MShqJlJ04rVO8iA7CrORpKYnEGM1iyStQg&oe=654E1620" />}
                    label={name}
                    variant="outlined"
                />
                <Button onClick={handleLogOut} variant="contained">Log Out</Button>
            </Box>
            {loading ? (
                <Box
                    sx={{ display: "flex", justifyContent: "center", marginTop: "25%" }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <div style={{ height: 400, width: "100%" }}>
                    <Typography sx={{ textAlign: "center", margin: "50px" }}>
                        List of management users
                    </Typography>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            )}
        </>
    );
}

export default Home;
