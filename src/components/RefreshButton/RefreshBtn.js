import { useState } from "react";
import { Box, Fab, CircularProgress } from "@mui/material";
import { Cached } from "@mui/icons-material";

export default function RefreshBtn({onClick}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
        onClick();
      setLoading(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
        }}
        disabled={loading}
        onClick={handleSubmit}
      >
        <Cached />
      </Fab>
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}
