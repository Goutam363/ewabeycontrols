import { createContext, useState, useEffect } from "react";
import { getAdminStateCookie, getLoginStateCookie, getUsernameByToken } from "./cookieUtils";
import { getTokenFromCookie } from "./cookieUtils";

// Create a new context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [amAdmin, setAmAdmin] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState("");
  const [tokenContext, setTokenContext] = useState("");
  const [profile, setProfile] = useState(null);
  const [projectsContext, setProjectsContext] = useState([]);
  const [usersContext, setUsersContext] = useState([]);
  const [staffsContext, setStaffsContext] = useState([]);
  const [adminsContext, setAdminsContext] = useState([]);
  const [contactsContext, setContactsContext] = useState([]);

  useEffect(() => {
    // Check login state cookie on page load
    const loginState = getLoginStateCookie();
    const adminState = getAdminStateCookie();
    setLoggedin(loginState === "true");
    setAmAdmin(adminState === "true");
    if(loginState && tokenContext === "") {
      setTokenContext(getTokenFromCookie());
    }
    if(loginState && username === "") {
      if(tokenContext === "") {
        const token = getTokenFromCookie();
        setTokenContext(token);
        setUsername(getUsernameByToken(token));
      } else {
        setUsername(getUsernameByToken(tokenContext));
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedin,
        setLoggedin,
        username,
        setUsername,
        profile,
        setProfile,
        amAdmin,
        setAmAdmin,
        projectsContext,
        setProjectsContext,
        usersContext,
        setUsersContext,
        staffsContext,
        setStaffsContext,
        adminsContext,
        setAdminsContext,
        contactsContext,
        setContactsContext,
        tokenContext,
        setTokenContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};