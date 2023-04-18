import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 1000,
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: theme.spacing(1.5),
  },
}));