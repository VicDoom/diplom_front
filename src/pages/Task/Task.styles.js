import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  controls: {
    display: "flex",
    gap: theme.spacing(1),
    "& > div": {
      width: "80%",
    },
    "& > button": {
      width: "20%",
    },
  },
}));