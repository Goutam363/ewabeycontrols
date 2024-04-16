import { useState, useEffect, useMemo, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertUTCToIST } from "../timeUtils";
import { AuthContext } from "../AuthProvider";
import RefreshBtn from "../RefreshButton/RefreshBtn";
import { FetchStaffs } from "../Controller";
import StaffActions from "./StaffActions";

export default function Staffs() {
  const { loggedin, amAdmin, staffsContext, setStaffsContext, tokenContext } = useContext(AuthContext);
  const [staffs, setStaffs] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if((staffsContext.length === 0) || (refresh > 0) ) {
          await FetchStaffs(amAdmin, setStaffsContext, tokenContext);
      }
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          toast.warn("Check your internet connection!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          return;
        } else {
          toast.error(
            `Something went wrong! error code "${error.code}". Please contact to ewabey team.`,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            }
          );
          return;
        }
      }
    };

    fetchData();
  }, [refresh, loggedin]);

  useEffect(() => {
    setStaffs(staffsContext);
  }, [staffsContext]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Staff id", width: 200, sortable: false },
      {
        field: "username",
        headerName: "Username",
        width: 200,
        sortable: false,
        editable: amAdmin,
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        sortable: false,
        editable: amAdmin,
      },
      {
        field: "staff_details",
        headerName: "Employee Details",
        width: 130,
        sortable: false,
        filterable: false,
        editable: amAdmin,
        renderCell: (params) => {
          const staffDetails = params.value;
          if (staffDetails) {
            return (
              <Link
                to={staffDetails}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DescriptionIcon />
              </Link>
            );
          } else {
            return null; // Render nothing if staff_details is empty
          }
        },
      },
      {
        field: "email",
        headerName: "Email Address",
        width: 200,
        sortable: false,
        editable: amAdmin,
      },
      {
        field: "mobile",
        headerName: "Mobile No.",
        width: 200,
        sortable: false,
        editable: amAdmin,
      },
      {
        field: "dob",
        headerName: "DOB",
        width: 200,
        sortable: false,
        editable: amAdmin,
      },
      {
        field: "account_status",
        headerName: "Account Status",
        width: 200,
        sortable: false,
        type: "singleSelect",
        valueOptions: [
          "ACTIVE",
          "DEACTIVE",
          "BLOCKED",
        ],
        editable: amAdmin,
      },
      {
        field: "account_create_date",
        headerName: "Created",
        width: 200,
        renderCell: (params) => {
          const { istDate, istTime } = convertUTCToIST(params.row.account_create_date);
          return `${istDate}, ${istTime}`;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <StaffActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  const handleRefresh = () => {
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  return (
    <div>
      <RefreshBtn onClick={handleRefresh}/>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ textAlign: "center", mt: 3, mb: 3, fontSize: "3rem" }}
        >
          Manage Staffs
        </Typography>
        <DataGrid
          columns={columns}
          rows={staffs}
          getRowId={(row) => row.id}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          onCellEditStop={(params)=>{
            setRowId(params.id);
          }}
        />
      </Box>
      <ToastContainer />
    </div>
  );
}
