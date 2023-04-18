import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 400,
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 200,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
}));