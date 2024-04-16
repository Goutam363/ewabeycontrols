import "./Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { setTokenCookie, setLoginStateCookie, setAdminStateCookie } from "../cookieUtils";
import { AuthContext } from "../AuthProvider";
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({isAdmin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedin, setUsername: setUsernameContext, setAmAdmin, setTokenContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here

    try {

        if(isAdmin){

        // Send POST request to the authentication endpoint
        const response = await axios.post(`${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/admin/signin`, {
            username: username,
            password: password
          });
    
          // Extract token from the response data
          const token = response.data.accessToken;
    
          // Store token in cookie
          setTokenCookie(token);
          await setTokenContext(token);
          setLoginStateCookie(true); // Set loggedin cookie state to true
          setAdminStateCookie(true);
          await setLoggedin(true); // Set loggedin context state to true
          await setUsernameContext(username); // Store username in context
          await setAmAdmin(true);
    
          // Reset form inputs
          setUsername('');
          setPassword('');
    
          // Redirect to previous page
          navigate('/'); // Navigate back to the previous page

        } else {

        // Send POST request to the authentication endpoint
        const response = await axios.post(`${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/staff/signin`, {
          username: username,
          password: password
        });
  
        // Extract token from the response data
        const token = response.data.accessToken;
  
        // Store token in cookie
        setTokenCookie(token);
        await setTokenContext(token);
        setLoginStateCookie(true) // Set loggedin cookie state to true
        await setLoggedin(true); // Set loggedin context state to true
        await setUsernameContext(username); // Store username in context
        await setAmAdmin(false);
  
        // Reset form inputs
        setUsername('');
        setPassword('');
  
        // Redirect to previous page
        navigate('/'); // Navigate back to the previous page
    }
  
      } catch (error) {
        if(error.code === 'ERR_BAD_REQUEST'){
          toast.error('Check your login credentials!', {
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
        } else if(error.code === 'ERR_NETWORK') {
          toast.warn('Check your internet connection!', {
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
        } else {
          toast.error(`Some error occured. Can't login.`, {
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
        }
      }

  };

  return (
    <div className={`login-container ${isAdmin ? 'admin-bg' : 'staff-bg'}`}>
      <Container
        mt={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "15px",
              }}
            >
              <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                  Login
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    variant="outlined"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    placeholder="Enter password"
                    value={password}
                    sx={{mt:"1.5rem"}}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt:"2rem"}}
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
    </div>
  );
}
