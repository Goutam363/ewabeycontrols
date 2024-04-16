// Function to convert UTC time to IST and return date and time object
const convertUTCToIST = (utcTimestamp) => {
    // Create a Date object from the UTC timestamp
    const utcDate = new Date(utcTimestamp);
  
    // Convert to Indian Standard Time (IST)
    const ISTDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  
    // Extract day, month, year, hours, and minutes from the IST timestamp
    const day = ISTDate.getDate().toString().padStart(2, '0');
    const month = (ISTDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = ISTDate.getFullYear();
  
    let hours = ISTDate.getHours();
    const minutes = ISTDate.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
  
    // Create the date and time objects
    const dateObject = {
      istDate: `${day}-${month}-${year}`,
      istTime: formattedTime
    };
  
    return dateObject;
  };
  
  // Export the function
  export { convertUTCToIST };