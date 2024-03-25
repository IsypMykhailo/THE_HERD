'use client'

import '../../_css/Admin.css'
import {useState} from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "../../_components/admin/theme";
import MySidebar from "../../_components/admin/Sidebar";
import Topbar from "../../_components/admin/Topbar";
import Dashboard from "../../_components/admin/Dashboard";

const Admin = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
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