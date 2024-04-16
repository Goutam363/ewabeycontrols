// Function to set a JWT token in a cookie
export const setTokenCookie = (token) => {
    // Set the cookie with the token, specifying the cookie name, value, and optional parameters like expiration and path
    document.cookie = `jwtToken=${token}; expires=${new Date(Date.now() + 3600 * 1000 * 24).toUTCString()}; path=/`;
  };

  export const setLoginStateCookie = (loggedin) => {
    document.cookie = `loggedin=${loggedin}; max-age=${60 * 60 * 24}`; // Set cookie to expire in 1 day
};

export const setAdminStateCookie = (amAdmin) => {
  document.cookie = `sp=${amAdmin}; max-age=${60 * 60 * 24}`; // Set cookie to expire in 1 day
};

export const getUsernameByToken = (token) => {
  try {
    // Split the token into its header, payload, and signature parts
    const [header, payload, signature] = token.split('.');

    // Decode the payload part of the token
    const decodedPayload = JSON.parse(atob(payload));

    // Check if the payload contains the username
    if (decodedPayload && decodedPayload.username) {
      // Return the username
      return decodedPayload.username;
    } else {
      // If the payload does not contain the username, return null
      return null;
    }
  } catch (error) {
    // If an error occurs during decoding, return null
    console.error('Error decoding token:', error);
    return null;
  }
}
  
  // Function to get the JWT token from the cookie
  export const getTokenFromCookie = () => {
    // Get all cookies as a string
    const cookies = document.cookie;
    // Split the cookies string into an array of individual cookies
    const cookieArray = cookies.split(';');
    // Iterate over each cookie to find the one with the name 'jwtToken'
    for (const cookie of cookieArray) {
      // Split the cookie into its name and value parts
      const [name, value] = cookie.trim().split('=');
      // Check if the cookie name is 'jwtToken'
      if (name === 'jwtToken') {
        // Return the token value
        return value;
      }
    }
    // If 'jwtToken' cookie is not found, return null
    return null;
  };

  export const getLoginStateCookie = () => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith('loggedin='));
    return cookie ? cookie.split('=')[1] : null;
};

export const getAdminStateCookie = () => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith('sp='));
  return cookie ? cookie.split('=')[1] : null;
};
  
  // Function to delete the JWT token cookie
  export const deleteTokenCookie = () => {
    // Set the cookie's expiration date to a date in the past
    document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Set the cookie's expiration date to a date in the past
    document.cookie = 'loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Set the cookie's expiration date to a date in the past
    document.cookie = 'sp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };