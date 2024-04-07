'use client'

import '../../_css/Admin.css'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from 'next/router'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../_components/admin/theme";
import MySidebar from "../../_components/admin/Sidebar";
import Topbar from "../../_components/admin/Topbar";
import Dashboard from "../../_components/admin/Dashboard";
import nextConfig from "@/next.config.mjs";

const Admin = () => {
    const router = useRouter();
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        const validateAdmin = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + "/api/admin/validate", {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setIsAdmin(data.isAdmin);
                } else {
                    router.push("/"); // Redirect to main page if user is not an admin
                }
            } catch (error) {
                console.error('Failed to validate admin status', error);
            }
        };

        validateAdmin();
    }, [router]);

    if (!isAdmin) {
        return null;
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={"admin-container"}>
                    <MySidebar isSidebar={isSidebar}></MySidebar>
                    <div className={"content-container"}>
                        <Topbar setIsSidebar={setIsSidebar}></Topbar>
                        <Dashboard></Dashboard>
                    </div>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Admin;
