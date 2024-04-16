import { useState, useEffect, useContext } from "react";
import { Box, Fab, CircularProgress } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserActions({ params, rowId, setRowId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { loggedin, amAdmin, tokenContext } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
      setLoading(true);
      setTimeout(async () => {
        const {
          id,
          name,
          email,
          mobile,
          dob,
          username,
          account_status,
        } = params.row;

        try {
            let result;
            if(amAdmin) {
          result = await axios.patch(
            `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/admin/${id}/user`,
            {
              name,
              email,
              mobile,
              dob,
              username,
              account_status,
            },
            {
                headers: {
                    Authorization: `Bearer ${tokenContext}`,
                },
            }
          );
        } else {
            result = await axios.patch(
                `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/staff/${id}`,
                {
                  mobile,
                  dob,
                  account_status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenContext}`,
                    },
                }
              );
        }
          if (result.data) {
            setSuccess(true);
            setRowId(null);
          }
        } catch (error) {
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
        }

        setLoading(false);
      }, 1500);
  };

  useEffect(() => {
    if (loggedin) {
      if (rowId === params.id && success) {
        setSuccess(false);
      }
    } else {
      navigate("/login");
    }
  }, [rowId]);

  return (
    <>
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
    <ToastContainer />
    </>
  );
}
