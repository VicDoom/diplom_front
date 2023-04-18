import { Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";

export const Snackbar = ({ open, onClose, status, text }) => {
  const getColor = (status) => status === "fulfilled" ? "success" : "error";
  return (
    <MuiSnackbar autoHideDuration={1500} open={open} onClose={onClose}>
      <MuiAlert severity={getColor(status)} variant="outlined">
        {text}
      </MuiAlert>
    </MuiSnackbar>
  );
};