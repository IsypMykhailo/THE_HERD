'use client'

import { Box } from "@mui/material";
import Header from "../../../_components/admin/Header";
import LineChart from "../../../_components/admin/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
