'use client'

import {Box, Typography} from "@mui/material";
import Header from "@/app/_components/admin/Header";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import nextConfig from "@/next.config.mjs";
import Table from "@/app/_components/admin/Table";

const Transactions = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState(null)
    const columns = [
        {
            field: "fullName",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: false
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            editable: false
        },
        {
            field: "sum",
            headerName: "Sum",
            flex: 1,
            editable: false
        },
        {
            field: "transactionDate",
            headerName: "Date",
            flex: 1,
            editable: false
        },
    ];

    useEffect(() => {
        setLoading(true)

        const fetchTransactions = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + '/api/transactions/get/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })

                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json()
                console.log(data)
                setTransactions(data)
            } catch (error) {
                console.error("Failed to fetch transactions " + error);
            }
        }
        fetchTransactions()
    }, [router]);

    useEffect(() => {
        if(transactions === null) return
        setLoading(false)
    }, [transactions]);

    return (
        <Box m="20px">
            <div className={'flex flex-row justify-between items-center'}>
                <Header title="Transactions" subtitle="List of Transactions"/>
                <div>
                    <button
                        className={'pl-5 pr-5 pt-2 pb-2 bg-[#8b3c7e] text-[#fdfeff] font-[600] hover:opacity-70 transition-[0.2s]'}>
                        Add Transaction
                    </button>
                </div>
            </div>
            {!loading && (
                <Table data={transactions} columns={columns}/>
            )}
        </Box>
    );
};

export default Transactions;
