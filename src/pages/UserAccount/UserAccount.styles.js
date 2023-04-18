import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  resultBox: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));