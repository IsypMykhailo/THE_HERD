import Header from "@/app/_components/admin/Header";
import {Box, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "@/app/_components/admin/theme";

const Table = ({data, columns}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    // border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#242628",
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.purpleAccent[100],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiTablePagination-selectLabel": {
                    color: '#fdfeff !important',
                    fontWeight: '500'
                },
                "& .MuiTablePagination-select": {
                    color: '#fdfeff !important',
                    fontWeight: '500'
                },
                "& .MuiTablePagination-selectIcon": {
                    color: '#fdfeff !important',
                    fontWeight: '500'
                },
                "& .MuiTablePagination-displayedRows": {
                    color: '#fdfeff !important',
                    fontWeight: '500'
                },
            }}
        >
            <DataGrid checkboxSelection rows={data} columns={columns}/>
        </Box>
    )
}

export default Table