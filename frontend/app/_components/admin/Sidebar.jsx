'use client'

import React, {useEffect, useState} from "react";
import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Link from "next/link";
import {useRouter} from "next/navigation";
import nextConfig from "@/next.config.mjs";

const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Link href={to} className={'flex flex-row my-4 p-3 gap-2 items-center hover:opacity-50 transition menu-item'}>
            {icon}
            <div>{title}</div>
        </Link>
    );
};

const MySidebar = () => {
    const theme = useTheme();
    const router = useRouter()
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [adminData, setAdminData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchAdminData = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + "/api/admin/getAdminData", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                })

                if (response.status === 200) {
                    const data = await response.json();
                    setAdminData(data);
                } else {
                    throw new Error("Error fetching admin data")
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchAdminData()
    }, [])

    useEffect(() => {
        if(!adminData) return
        setLoading(false)
    }, [adminData])

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
            height={"100vh"}
        >
            <Sidebar collapsed={isCollapsed} backgroundColor={colors.primary[400]} className={"h-[100vh]"}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                            backgroundColor: colors.primary[400]
                        }}
                        className={"hover:opacity-50 transition"}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <h2 style={{letterSpacing: '4px', fontWeight: 700, fontSize: '24px'}} onClick={() => router.push("/")}>THE HERD</h2>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && !loading && (
                        <Box mb="25px">
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{m: "10px 0 0 0"}}
                                >
                                    {adminData.firstName + ' ' + adminData.lastName}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    THE HERD Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to={'/admin'}
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Data
                        </Typography>
                        <Item
                            title="Manage Team"
                            to={'/admin/team'}
                            icon={<PeopleOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoices Balances"
                            to={'/admin/invoices'}
                            icon={<ReceiptOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            Pages
                        </Typography>
                        <Item
                            title="Calendar"
                            to={'/admin/calendar'}
                            icon={<CalendarTodayOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default MySidebar;
