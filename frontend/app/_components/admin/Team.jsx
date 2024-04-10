'use client'

import '../../_css/Admin.css';
import Table from "./Table";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import nextConfig from "@/next.config.mjs";
import Header from "@/app/_components/admin/Header";
import {Box} from "@mui/material";
import RoleSelect from "@/app/_components/admin/RoleSelect";

const Team = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState(null)
    const [roles, setRoles] = useState(null)
    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
        },
    ];

    useEffect(() => {
        setLoading(true)

        const fetchUsers = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + "/api/users/get/all", {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })

                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const data = await response.json()
                // data.forEach(el => el.role = el.roles[0].name)
                setUsers(data)
            } catch (error) {
                console.error('Failed to fetch users ', error)
            }
        }

        const fetchRoles = async () => {
            try{
                const response = await fetch(nextConfig.env.apiUrl + "/api/users/get/roles/all", {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })

                if(!response.ok) {
                    throw new Error(response.statusText)
                }
                const data = await response.json()
                setRoles(data)
            } catch (error) {
                console.error('Failed to fetch roles ' + error)
            }
        }

        fetchUsers()
        fetchRoles()
    }, [router]);

    useEffect(() => {
        if (users === null || roles === null) return
        setLoading(false)
    }, [users, roles]);

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            const response = await fetch(nextConfig.env.apiUrl + "/api/users/updateRole", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                },
                body: JSON.stringify({ userId: userId, roleId: newRole }),
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }
            alert('Role updated successfully');
        } catch (error) {
            alert('Failed to update role ' + error);
        }
    }

    columns.find(col => col.field === 'role').renderCell = (cellValues) => {
        let currentRole
        roles.forEach(el => {
            if(el.id === cellValues.row.roles[0].id) {
                currentRole = el
            }
        })
        return (
            <RoleSelect
                userId={cellValues.row.id}
                currentRole={currentRole}
                roles={roles}
                onUpdate={handleRoleUpdate}
            />
        );
    };

    return (
        <Box m="20px">
            <Header title={"TEAM"} subtitle={"Managing the Team Members"}/>
            {!loading && (
                <Table data={users} columns={columns}/>
            )}
        </Box>
    );
};

export default Team;
