'use client'

import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "@/app/_components/admin/theme";
import {mockDataInvoices} from "@/app/_data/mockData";
import Header from "../../../_components/admin/Header";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import nextConfig from "@/next.config.mjs";
import Loading from "@/app/_components/Loading";

const Invoices = () => {
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
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => (
                <Typography color={colors.greenAccent[500]}>
                    ${params.row.cost}
                </Typography>
            ),
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
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
                <Header title="INVOICES" subtitle="List of Invoice Balances"/>
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
                    <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns}/>
                </Box>
            </Box>
        </>
    );
};

export default Invoices;
