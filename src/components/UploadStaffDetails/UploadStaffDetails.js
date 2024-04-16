import { useState, useContext } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import { AuthContext } from "../AuthProvider";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchStaffs, UploadStaffDetailsIntoServer, VerifyStaffByid } from "../Controller";

export default function UploadStaffDetails() {

    const { amAdmin, tokenContext, setStaffsContext } = useContext(AuthContext);
  const [staffid, setStaffid] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // Regex patterns for validation
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const pdfRegex = /\.pdf$/i;

  const validate = () => {
    if (!selectedFile) {
      toast.warn("Please select a file", {
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
      return false;
    }
    if (!uuidRegex.test(staffid)) {
      toast.warn("It's not a valid staff id. Enter carefully.", {
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
      return false;
    }
    if (!pdfRegex.test(selectedFile.name)) {
      toast.warn("Please select proper staff details file", {
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
      return false;
    }
    return true;
  };

  const handleStaffidChange = (event) => {
    setStaffid(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    if (validate()) {
      try {
        const staff = await VerifyStaffByid(
          amAdmin,
          staffid,
          tokenContext
        );

        const modifyFilename = (filename) => {
          const extIndex = filename.lastIndexOf(".");
          const extension = filename.substring(extIndex);
          return `${staffid}${extension}`;
        };

        if (staff) {
          //Have to upload the file into firebase storage

            const modifiedFilename = modifyFilename(selectedFile.name);
            const formData = new FormData();
            formData.append("file", selectedFile, modifiedFilename);

            await UploadStaffDetailsIntoServer(amAdmin, formData, tokenContext);

            await FetchStaffs(amAdmin, setStaffsContext, tokenContext);

            setStaffid("");
            setSelectedFile(null);

            toast.success("Staff details uploaded successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              onClose: () => {
                setSubmitDisabled(false);
              },
            });
        } else {
          toast.warn(`Staff with id: ${staffid} not found!`, {
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
          setSubmitDisabled(false);
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
          setSubmitDisabled(false);
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
          setSubmitDisabled(false);
        }
      }
    } else {
      setSubmitDisabled(false);
    }
  };
    
  return (
    <>
    <Card sx={{mt:"2rem"}}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upload Staff Details PDF File
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Staff id"
            value={staffid}
            placeholder="Enter Staff id"
            onChange={handleStaffidChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {selectedFile ? selectedFile.name : "No file selected"}
          </Typography>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitDisabled}
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
    <ToastContainer />
    </>
  )
}
