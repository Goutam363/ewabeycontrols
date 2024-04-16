import axios from "axios";

const FetchProjects = async (amAdmin, setProjectsContext, tokenContext) => {
      // Make GET request to retrieve projects data
        let projectItemResponse;
        if(amAdmin) {
        projectItemResponse = await axios.get(
          `${process.env.REACT_APP_EWABEY_BACKEND_URL}/project/secure/admin`,
          {
            headers: {
              Authorization: `Bearer ${tokenContext}`,
            },
          }
        );
      } else {
        projectItemResponse = await axios.get(
          `${process.env.REACT_APP_EWABEY_BACKEND_URL}/project/secure/staff`,
          {
            headers: {
              Authorization: `Bearer ${tokenContext}`,
            },
          }
        );
      }
      const projectTemp = projectItemResponse.data;
      await setProjectsContext(projectTemp);
}

const FetchUsers = async (amAdmin, setUsersContext, tokenContext) => {
    // Make GET request to retrieve users data
      let userItemResponse;
      if(amAdmin) {
      userItemResponse = await axios.get(
        `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/admin/get-users`,
        {
          headers: {
            Authorization: `Bearer ${tokenContext}`,
          },
        }
      );
    } else {
      userItemResponse = await axios.get(
        `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/staff/get-users`,
        {
          headers: {
            Authorization: `Bearer ${tokenContext}`,
          },
        }
      );
    }
    const userTemp = userItemResponse.data;
    await setUsersContext(userTemp);
}

const FetchStaffs = async (amAdmin, setStaffsContext, tokenContext) => {
    // Make GET request to retrieve users data
      if(amAdmin) {
      const staffItemResponse = await axios.get(
        `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/admin/get-staffs`,
        {
          headers: {
            Authorization: `Bearer ${tokenContext}`,
          },
        }
      );
        const staffTemp = staffItemResponse.data;
        await setStaffsContext(staffTemp);
    }
}

const FetchAdmins = async (amAdmin, setAdminsContext, tokenContext) => {
    // Make GET request to retrieve users data
      if(amAdmin) {
      const adminItemResponse = await axios.get(
        `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/secure/admin/get-admins`,
        {
          headers: {
            Authorization: `Bearer ${tokenContext}`,
          },
        }
      );
        const adminTemp = adminItemResponse.data;
        await setAdminsContext(adminTemp);
    }
}

const FetchContacts = async (amAdmin, setContactsContext, tokenContext) => {
  // Make GET request to retrieve users data
    let contactItemResponse;
    if(amAdmin) {
    contactItemResponse = await axios.get(
      `${process.env.REACT_APP_EWABEY_BACKEND_URL}/contact/secure/admin`,
      {
        headers: {
          Authorization: `Bearer ${tokenContext}`,
        },
      }
    );
  } else {
    contactItemResponse = await axios.get(
      `${process.env.REACT_APP_EWABEY_BACKEND_URL}/contact/secure/staff`,
      {
        headers: {
          Authorization: `Bearer ${tokenContext}`,
        },
      }
    );
  }
  const contactTemp = contactItemResponse.data;
  await setContactsContext(contactTemp);
}

const VerifyProjectByid = async (amAdmin, project_id, tokenContext) => {
if(amAdmin){
  const projectItemResponse = await axios.get(
    `${process.env.REACT_APP_EWABEY_BACKEND_URL}/project/secure/admin/${project_id}/verify`,
    {
      headers: {
        Authorization: `Bearer ${tokenContext}`,
      },
    }
  );
  return projectItemResponse.data;
}
}

const VerifyStaffByid = async (amAdmin, staff_id, tokenContext) => {
  if(amAdmin){
    const staffItemResponse = await axios.get(
      `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/staff/secure/admin/${staff_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${tokenContext}`,
        },
      }
    );
    return staffItemResponse.data;
  }
  }

  const VerifyAdminByid = async (amAdmin, admin_id, tokenContext) => {
    if(amAdmin){
      const adminItemResponse = await axios.get(
        `${process.env.REACT_APP_EWABEY_BACKEND_URL}/auth/admin/secure/admin/${admin_id}/verify`,
        {
          headers: {
            Authorization: `Bearer ${tokenContext}`,
          },
        }
      );
      return adminItemResponse.data;
    }
    }

const UploadProjectDetailsIntoServer = async ( amAdmin, formData, tokenContext ) => {
  if(amAdmin){
    const projectItemResponse = await axios.post(
      `${process.env.REACT_APP_EWABEY_BACKEND_URL}/firebase-storage/upload/project-details`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenContext}`,
        },
      }
    );
    return projectItemResponse.data;
  }
  
  }

  const UploadStaffDetailsIntoServer = async ( amAdmin, formData, tokenContext ) => {
    if(amAdmin){
      const staffItemResponse = await axios.post(
        `${process.env.REACT_APP_EWABEY_BACKEND_URL}/firebase-storage/upload/staff-details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tokenContext}`,
          },
        }
      );
      return staffItemResponse.data;
    }
    
    }

    const UploadAdminDetailsIntoServer = async ( amAdmin, formData, tokenContext ) => {
      if(amAdmin){
        const adminItemResponse = await axios.post(
          `${process.env.REACT_APP_EWABEY_BACKEND_URL}/firebase-storage/upload/admin-details`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${tokenContext}`,
            },
          }
        );
        return adminItemResponse.data;
      }
      
      }

export { FetchProjects, FetchUsers, FetchStaffs, FetchAdmins, FetchContacts, VerifyProjectByid, UploadProjectDetailsIntoServer, VerifyStaffByid, UploadStaffDetailsIntoServer, VerifyAdminByid, UploadAdminDetailsIntoServer };