import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: 500,
  },
  button: {
    backgroundColor: "#c2def8",
    "&:hover": {
      backgroundColor: "#9ccaf5",
    },
  },
  box: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  boxButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));