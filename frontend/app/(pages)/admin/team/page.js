'use client'

import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "@/app/_components/admin/theme";
import {mockDataTeam} from "@/app/_data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../_components/admin/Header";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import nextConfig from "@/next.config.mjs";
import Loading from "@/app/_components/Loading";

const Team = () => {
    const theme = useTheme();
    const router = useRouter()
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true)
    const [loadingClass, setLoadingClass] = useState('')
    const [isAdmin, setIsAdmin] = useState(null)
    const columns = [
        {field: "id", headerName: "ID"},
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "accessLevel",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({row: {access}}) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin"
                                ? colors.greenAccent[600]
                                : access === "manager"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon/>}
                        {access === "manager" && <SecurityOutlinedIcon/>}
                        {access === "user" && <LockOpenOutlinedIcon/>}
                        <Typography color={colors.grey[100]} sx={{ml: "5px"}}>
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    useEffect(() => {
        setLoading(true)
        const validateAdmin = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + "/api/admin/validate", {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                });

                if (response.status === 200) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false)
                    router.push("/"); // Redirect to main page if user is not an admin
                }
            } catch (error) {
                console.error('Failed to validate admin status', error);
            }
        };

        validateAdmin();
    }, [router]);

    useEffect(() => {
        const loadPage = async () => {
            if (isAdmin === null) return
            setLoadingClass('hidden')
            const timer = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(timer);
        }
        loadPage()
    }, [isAdmin]);

    return (
        <>
            {loading && (
                <Loading loadingClass={loadingClass}/>
            )}
            <Box m="20px">
                <Header title="TEAM" subtitle="Managing the Team Members"/>
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid checkboxSelection rows={mockDataTeam} columns={columns}/>
                </Box>
            </Box>
        </>
    );
};

export default Team;
