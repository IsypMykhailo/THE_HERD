'use client'

import '../../_css/Admin.css'
import '../../_css/Home.css';
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation"; // Import from 'next/router'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "../../_components/admin/theme";
import MySidebar from "../../_components/admin/Sidebar";
import Dashboard from "../../_components/admin/Dashboard";
import nextConfig from "@/next.config.mjs";
import Loading from "@/app/_components/Loading";

const Admin = () => {
    const router = useRouter();
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true)
    const [loadingClass, setLoadingClass] = useState('')

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

    if (!isAdmin) {
        return null;
    }

    return (
        <div className={'w-[100vw] h-[100vh] overflow-hidden'}>
            {loading && (
                <Loading loadingClass={loadingClass}/>
            )}
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className={"admin-container"}>
                        <MySidebar isSidebar={isSidebar}></MySidebar>
                        <div className={"content-container flex flex-col justify-center"}>
                            <Dashboard></Dashboard>
                        </div>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </div>
    )
}

export default Admin;
