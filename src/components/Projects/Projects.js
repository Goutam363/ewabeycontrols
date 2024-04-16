import { useState, useEffect, useMemo, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertUTCToIST } from "../timeUtils";
import ProjectActions from "./ProjectActions";
import { AuthContext } from "../AuthProvider";
import RefreshBtn from "../RefreshButton/RefreshBtn";
import { FetchProjects } from "../Controller";

export default function Projects() {
  const { loggedin, amAdmin, projectsContext, setProjectsContext, tokenContext } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if((projectsContext.length === 0) || (refresh > 0) ) {
          // const token = getTokenFromCookie();
          await FetchProjects(amAdmin, setProjectsContext, tokenContext);

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
    setProjects(projectsContext);
  }, [projectsContext]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Project id", width: 200, sortable: false },
      {
        field: "project_name",
        headerName: "Project Name",
        width: 200,
        sortable: false,
        editable: amAdmin,
      },
      {
        field: "project_details",
        headerName: "Project Details",
        width: 130,
        sortable: false,
        filterable: false,
        editable: true,
        renderCell: (params) => {
          const projectDetails = params.value;
          if (projectDetails) {
            return (
              <Link
                to={projectDetails}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DescriptionIcon />
              </Link>
            );
          } else {
            return null; // Render nothing if project_details is empty
          }
        },
      },
      { field: "project_value", headerName: "Project Value", width: 200, editable: amAdmin },
      { field: "paid_amount", headerName: "Paid Amount", width: 200, editable: amAdmin },
      {
        field: "project_stage",
        headerName: "Project Stage",
        width: 200,
        sortable: false,
        type: "singleSelect",
        valueOptions: [
          "PLANNING",
          "DESIGN",
          "DEVELOPMENT",
          "INTEGRATION",
          "DEPLOYMENT",
          "TESTING",
          "MAINTENANCE",
          "SUPPORT",
          "CANCELED",
          "COMPLETED",
        ],
        editable: true,
      },
      {
        field: "project_status",
        headerName: "Project Status",
        width: 200,
        sortable: false,
        type: "singleSelect",
        valueOptions: [
          "WAITING_FOR_APPROVE",
          "APPROVED",
          "PAYMENT_DUE",
          "IN_PROGRESS",
          "CANCELED",
          "COMPLETED",
        ],
        editable: true,
      },
      { field: "refund_amount", headerName: "Refund Amount", width: 200, editable: amAdmin },
      {
        field: "payment_ids",
        headerName: "Payment ids",
        width: 200,
        sortable: false,
        editable: true,
      },
      { field: "email", headerName: "Email", width: 230, sortable: false, editable: amAdmin },
      { field: "mobile", headerName: "Mobile", width: 200, sortable: false, editable: amAdmin },
      {
        field: "address",
        headerName: "Address",
        width: 400,
        sortable: false,
        editable: amAdmin,
        renderCell: (params) => {
          if (params.row.address === "") {
            return null;
          }
          const addressArray = params.row.address.split("|");
          return `${addressArray[3]}, ${addressArray[2]}, ${addressArray[1]}, ${addressArray[0]}, (Zip code: ${addressArray[4]})`;
        },
      },
      {
        field: "username",
        headerName: "Username",
        width: 200,
        sortable: false,
      },
      {
        field: "start_date",
        headerName: "Created",
        width: 200,
        renderCell: (params) => {
          const { istDate, istTime } = convertUTCToIST(params.row.start_date);
          return `${istDate}, ${istTime}`;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <ProjectActions {...{ params, rowId, setRowId }} />
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
          Manage Projects
        </Typography>
        <DataGrid
          columns={columns}
          rows={projects}
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
