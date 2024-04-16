import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import ProjectPage from './pages/ProjectPage';
import UsersPage from './pages/UsersPage';
import StaffsPage from './pages/StaffsPage';
import AdminsPage from './pages/AdminsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ContactsPage from './pages/ContactsPage';
import DocsPage from './pages/DocsPage';
import CreateStaffPage from './pages/CreateStaffPage';
import CreateAdminPage from './pages/CreateAdminPage';
import UploadFiles from './pages/UploadFiles';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/projects",
    element: <ProjectPage />,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/users",
    element: <UsersPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/staffs",
    element: <StaffsPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/admins",
    element: <AdminsPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/contacts",
    element: <ContactsPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/upload-files",
    element: <UploadFiles/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/docs",
    element: <DocsPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/create-staff",
    element: <CreateStaffPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/create-admin",
    element: <CreateAdminPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/settings",
    element: <SettingsPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "/secure-login",
    element: <AdminLoginPage/>,
    errorElement: <PageNotFound/>,
  },
  {
    path: "*",
    element: <PageNotFound/>,
    errorElement: <PageNotFound/>,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
