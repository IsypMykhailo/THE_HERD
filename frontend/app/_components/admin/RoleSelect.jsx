'use client'

import { Select, MenuItem } from '@mui/material';
import nextConfig from "@/next.config.mjs";
import {useEffect, useState} from "react";

const RoleSelect = ({ userId, currentRole, roles, onUpdate }) => {
    const [selectedRole, setSelectedRole] = useState(currentRole)

    useEffect(() => {
        setSelectedRole(currentRole)
    }, [currentRole]);

    const handleChange = (event) => {
        const newRole = event.target.value;
        setSelectedRole(newRole)
        onUpdate(userId, newRole.id);
    };

    return (
        <Select
            value={selectedRole}
            onChange={handleChange}
            size="small"
            fullWidth
        >
            {roles.map((role, index) => (
                <MenuItem key={index} value={role}>{role.name}</MenuItem>
            ))}
        </Select>
    );
};

export default RoleSelect;