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
import { FetchProjects, UploadProjectDetailsIntoServer, VerifyProjectByid } from "../Controller";

export default function UploadProjectDetails() {
  const { amAdmin, tokenContext, setProjectsContext } = useContext(AuthContext);
  const [projectid, setProjectid] = useState("");
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
    if (!uuidRegex.test(projectid)) {
      toast.warn("It's not a valid project id. Enter carefully.", {
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
      toast.warn("Please select proper project details file", {
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

  const handleProjectidChange = (event) => {
    setProjectid(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    if (validate()) {
      try {
        const project = await VerifyProjectByid(
          amAdmin,
          projectid,
          tokenContext
        );

        const modifyFilename = (filename) => {
          const extIndex = filename.lastIndexOf(".");
          const extension = filename.substring(extIndex);
          return `${projectid}${extension}`;
        };

        if (project) {
          //Have to upload the file into firebase storage

            const modifiedFilename = modifyFilename(selectedFile.name);
            const formData = new FormData();
            formData.append("file", selectedFile, modifiedFilename);

            await UploadProjectDetailsIntoServer(amAdmin, formData, tokenContext);

            await FetchProjects(amAdmin, setProjectsContext, tokenContext);

            setProjectid("");
            setSelectedFile(null);

            toast.success("Project details uploaded successfully!", {
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
          toast.warn(`Project with id: ${projectid} not found!`, {
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
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upload Project Details PDF File
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Project id"
            value={projectid}
            placeholder="Enter Project id"
            onChange={handleProjectidChange}
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
  );
}
