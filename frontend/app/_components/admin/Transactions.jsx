'use client'

import {Box, Typography} from "@mui/material";
import Header from "@/app/_components/admin/Header";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import nextConfig from "@/next.config.mjs";
import Table from "@/app/_components/admin/Table";
import TransactionForm from "@/app/_components/admin/forms/TransactionForm";

const Transactions = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState(null)
    const [sum, setSum] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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

        fetchTransactions()
    }, [router]);

    useEffect(() => {
        if (transactions === null) return
        setLoading(false)
    }, [transactions]);

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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const addTransaction = async () => {
        try {
            const response = await fetch(nextConfig.env.apiUrl + '/api/transactions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    sum
                })
            })
            if (response.status !== 201) {
                throw new Error(response.statusText)
            }
            toggleModal()
            fetchTransactions()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <TransactionForm sum={sum} setSum={setSum} handleSubmit={addTransaction} isOpen={isModalOpen} toggleModal={toggleModal} />
            <Box m="20px">
                <div className={'flex flex-row justify-between items-center'}>
                    <Header title="Transactions" subtitle="List of Transactions"/>
                    <div>
                        <button
                            className={'pl-5 pr-5 pt-2 pb-2 bg-[#8b3c7e] text-[#fdfeff] font-[600] hover:opacity-70 transition-[0.2s]'} onClick={toggleModal}>
                            Add Transaction
                        </button>
                    </div>
                </div>
                {!loading && (
                    <Table data={transactions} columns={columns}/>
                )}
            </Box>
        </>
    );
};

export default Transactions;
