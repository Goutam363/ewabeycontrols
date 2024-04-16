import { useState, useEffect, useMemo, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertUTCToIST } from "../timeUtils";
import { AuthContext } from "../AuthProvider";
import RefreshBtn from "../RefreshButton/RefreshBtn";
import { FetchContacts } from "../Controller";
import ContactActions from "./ContactActions";

export default function Contacts() {
  const { loggedin, amAdmin, contactsContext, setContactsContext, tokenContext } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if((contactsContext.length === 0) || (refresh > 0) ) {
          // const token = getTokenFromCookie();
          await FetchContacts(amAdmin, setContactsContext, tokenContext);
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
    setContacts(contactsContext);
  }, [contactsContext]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "User id", width: 200, sortable: false },
      {
        field: "isUser",
        headerName: "User exist",
        width: 200,
        type: 'boolean',
        editable: amAdmin,
      },
      {
        field: "usernames",
        headerName: "Usernames",
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
        editable: true,
      },
      {
        field: "address",
        headerName: "Address",
        width: 400,
        sortable: false,
        editable: true,
        renderCell: (params) => {
          if (params.row.address === "") {
            return null;
          }
          const addressArray = params.row.address.split("|");
          return `${addressArray[3]}, ${addressArray[2]}, ${addressArray[1]}, ${addressArray[0]}, (Zip code: ${addressArray[4]})`;
        },
      },
      {
        field: "dnd",
        headerName: "DND",
        width: 200,
        type: 'boolean',
        editable: true,
      },
      {
        field: "create_date",
        headerName: "Created",
        width: 200,
        renderCell: (params) => {
          const { istDate, istTime } = convertUTCToIST(params.row.create_date);
          return `${istDate}, ${istTime}`;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <ContactActions {...{ params, rowId, setRowId }} />
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
          Manage Contacts
        </Typography>
        <DataGrid
          columns={columns}
          rows={contacts}
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
