'use client'

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import {useEffect, useState} from "react";
import nextConfig from "@/next.config.mjs";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState(null)
  const [loading, setLoading] = useState(true)

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

        if(!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json()
        setTransactions(data)
      } catch(error) {
        console.error("Failed to fetch transactions " + error);
      }
    }

    fetchTransactions().then(() => setLoading(false))
  }, [])

  const calculateTotalRevenue = () => {
    let revenue = 0;
    transactions.forEach(el => revenue += el.sum);
    return revenue;
  }

  return !loading && (
    <Box m="20px" pb={"20px"}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
        >
          <Box>
            <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
            >
              Revenue Generated
            </Typography>
            <Typography
                variant="h3"
                fontWeight="bold"
                color={"#8b3c7e"}
            >
              ${calculateTotalRevenue()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box>
        <Box
          backgroundColor={'#242628'}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid #242628`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {transactions.map((transaction, i) => (
            <Box
              key={`${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={"#8b3c7e"}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.fullName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.email}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.transactionDate}</Box>
              <Box
                backgroundColor={"#8b3c7e"}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.sum}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
